"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import {
  Heart,
  Clock,
  Layers,
} from "lucide-react";
import { SplashScreen } from "./splash-screen";
import { HubNavbar, type HubView } from "./hub-navbar";
import { HubFooter } from "./hub-footer";
import { ProductCard } from "./product-card";
import { NavFlash } from "./nav-flash";
import {
  PRODUCTS as DEFAULT_PRODUCTS,
  SECTORS,
  type Product,
  type FavouriteItem,
} from "@/lib/hub-data";
import {
  getFavourites,
  toggleFavourite,
  getRecents,
  addRecent,
  getProductVisibility,
  saveProductVisibility,
} from "@/lib/hub-storage";

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export function HubContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<HubView>("products");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // NavFlash state
  const [navFlashActive, setNavFlashActive] = useState(false);
  const [navFlashProduct, setNavFlashProduct] = useState<Product | null>(null);
  const [navFlashLabel, setNavFlashLabel] = useState("");

  // Products with visibility state
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);

  // Favourites and recents
  const [favourites, setFavourites] = useState<FavouriteItem[]>([]);
  const [recents, setRecents] = useState<FavouriteItem[]>([]);

  // Hydrate from localStorage
  useEffect(() => {
    setFavourites(getFavourites());
    setRecents(getRecents());
    const visibility = getProductVisibility();
    if (Object.keys(visibility).length > 0) {
      setProducts((prev) =>
        prev.map((p) => ({ ...p, visible: visibility[p.id] ?? p.visible }))
      );
    }
  }, []);

  const isFavourited = useCallback(
    (url: string) => favourites.some((f) => f.url === url),
    [favourites]
  );

  const handleToggleFavourite = useCallback((item: FavouriteItem) => {
    const updated = toggleFavourite(item);
    setFavourites(updated);
  }, []);

  const handleToggleVisibility = useCallback((productId: string) => {
    setProducts((prev) => {
      const updated = prev.map((p) =>
        p.id === productId ? { ...p, visible: !p.visible } : p
      );
      const visibility: Record<string, boolean> = {};
      updated.forEach((p) => (visibility[p.id] = p.visible));
      saveProductVisibility(visibility);
      return updated;
    });
  }, []);

  const doNavigate = useCallback(
    (product: Product, url: string, sectorName?: string) => {
      const recentItem: FavouriteItem = {
        url,
        name: sectorName ? `${product.name} \u2014 ${sectorName}` : product.name,
        productId: product.id,
        sectorId: null,
        productName: product.name,
        productColor: product.color,
        productBg: product.bg,
        productIcon: product.icon,
      };
      const updatedRecents = addRecent(recentItem);
      setRecents(updatedRecents);

      setNavFlashProduct(product);
      setNavFlashLabel(sectorName ? `${product.name} \u2014 ${sectorName}` : product.name);
      setTimeout(() => setNavFlashActive(true), 300);
      setTimeout(() => {
        window.location.href = `https://${url}`;
      }, 2800);
    },
    []
  );

  const handleProductClick = useCallback(
    (product: Product) => {
      if (product.needsSector) {
        setSelectedProduct(product);
        setSearchQuery("");
        setActiveTab("sectors");
      } else {
        doNavigate(product, product.url);
      }
    },
    [doNavigate]
  );

  const handleSectorClick = useCallback(
    (sectorId: string, sectorName: string) => {
      if (!selectedProduct) return;
      doNavigate(selectedProduct, `${selectedProduct.url}/${sectorId}`, sectorName);
    },
    [selectedProduct, doNavigate]
  );

  const handleFavouriteClick = useCallback(
    (item: FavouriteItem) => {
      const product = products.find((p) => item.url.startsWith(p.url)) || products[0];
      doNavigate(product, item.url);
    },
    [products, doNavigate]
  );

  const handleTabChange = useCallback((view: HubView) => {
    setActiveTab(view);
    setSelectedProduct(null);
  }, []);

  // Filtered products
  const visibleProducts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.visible &&
        p.name.toLowerCase().includes(q) &&
        (selectedCategory === undefined || p.group === selectedCategory)
    );
  }, [products, searchQuery, selectedCategory]);

  // Filtered favourites
  const filteredFavourites = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return favourites.filter((f) => f.name.toLowerCase().includes(q));
  }, [favourites, searchQuery]);

  // Filtered recents
  const filteredRecents = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return recents.filter((r) => r.name.toLowerCase().includes(q));
  }, [recents, searchQuery]);

  // Filtered sectors
  const filteredSectors = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return SECTORS.filter((s) => s.name.toLowerCase().includes(q));
  }, [searchQuery]);

  const SECTOR_ORDER = SECTORS.map((s) => s.id);

  function groupBySector<T>(
    items: T[],
    getSectorId: (item: T) => string | null | undefined
  ) {
    const groupMap = new Map<string, T[]>();
    for (const item of items) {
      const sectorId = getSectorId(item) ?? "other";
      groupMap.set(sectorId, [...(groupMap.get(sectorId) ?? []), item]);
    }
    return [...groupMap.keys()]
      .sort((a, b) => {
        const idxA = SECTOR_ORDER.indexOf(a);
        const idxB = SECTOR_ORDER.indexOf(b);
        return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
      })
      .map((sectorId) => ({
        sectorId,
        label: SECTORS.find((s) => s.id === sectorId)?.name ?? sectorId,
        items: groupMap.get(sectorId)!,
      }));
  }

  // Products grouped by sector (shown when no filter active)
  const productsByGroup = useMemo(() => {
    if (selectedCategory || searchQuery) return null;
    return groupBySector(visibleProducts, (p) => p.group);
  }, [visibleProducts, selectedCategory, searchQuery]);

  // Favourites grouped by product's category (same as Products tab)
  const favouritesByGroup = useMemo(
    () => groupBySector(filteredFavourites, (f) => {
      const product = products.find((p) => p.id === f.productId);
      return product?.group ?? null;
    }),
    [filteredFavourites, products]
  );

  // Recents grouped by product's category (same as Products tab)
  const recentsByGroup = useMemo(
    () => groupBySector(filteredRecents, (r) => {
      const product = products.find((p) => p.id === r.productId);
      return product?.group ?? null;
    }),
    [filteredRecents, products]
  );

  function getSectorLabel(sectorId: string | null | undefined): string | undefined {
    if (!sectorId) return undefined;
    return SECTORS.find((s) => s.id === sectorId)?.name;
  }

  // Helper to build favItem for a product
  function makeFavItem(product: Product): FavouriteItem | null {
    if (product.needsSector) return null;
    return {
      url: product.url,
      name: product.name,
      productId: product.id,
      sectorId: null,
      productName: product.name,
      productColor: product.color,
      productBg: product.bg,
      productIcon: product.icon,
    };
  }

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <HubNavbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        products={products}
        onToggleVisibility={handleToggleVisibility}
      />

      <main className="w-full flex-1">
        <div className="w-full px-3 py-4 md:px-10 md:py-6">
          {/* Products tab */}
          {activeTab === "products" && (
            <>
              {visibleProducts.length > 0 ? (
                <>
                  {/* ── Default view: grouped by category ── */}
                  {productsByGroup && (
                    <div className="space-y-7 md:space-y-10">
                      {productsByGroup.map(({ sectorId, label, items }) => (
                        <div key={sectorId}>
                          <div className="mb-2.5 md:mb-4 flex items-center justify-between">
                            <h2 className="font-display text-[15px] md:text-xl font-bold tracking-tight text-gray-900">{label}</h2>
                          </div>
                          <div className="space-y-2 md:space-y-3">
                            {chunk(items, 10).map((row, i) => (
                              <div key={i} className="-mx-3 md:-mx-10 flex gap-2 md:gap-3 overflow-x-auto px-3 md:px-10 pb-1 md:pb-2">
                                {row.map((product) => {
                                  const favItem = makeFavItem(product);
                                  return (
                                    <div key={product.id} className="w-[235px] flex-shrink-0">
                                      <ProductCard
                                        id={product.id} name={product.name} tagline={product.tagline}
                                        color={product.color} bg={product.bg} url={product.url}
                                        badge={product.badge} categoryLabel={getSectorLabel(product.group)} icon={product.icon}
                                        isFavourited={favItem ? isFavourited(favItem.url) : false}
                                        favouriteItem={favItem}
                                        onClick={() => handleProductClick(product)}
                                        onToggleFavourite={favItem ? () => handleToggleFavourite(favItem) : undefined}
                                        compact
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ── Filtered / search view: flat horizontal scroll ── */}
                  {!productsByGroup && (
                    <div className="space-y-2 md:space-y-3">
                      {chunk(visibleProducts, 10).map((row, i) => (
                        <div key={i} className="-mx-3 md:-mx-10 flex gap-2 md:gap-3 overflow-x-auto px-3 md:px-10 pb-1 md:pb-2">
                          {row.map((product) => {
                            const favItem = makeFavItem(product);
                            return (
                              <div key={product.id} className="w-[235px] flex-shrink-0">
                                <ProductCard
                                  id={product.id} name={product.name} tagline={product.tagline}
                                  color={product.color} bg={product.bg} url={product.url}
                                  badge={product.badge} categoryLabel={getSectorLabel(product.group)} icon={product.icon}
                                  isFavourited={favItem ? isFavourited(favItem.url) : false}
                                  favouriteItem={favItem}
                                  onClick={() => handleProductClick(product)}
                                  onToggleFavourite={favItem ? () => handleToggleFavourite(favItem) : undefined}
                                  compact
                                />
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center pb-20 pt-24 text-center px-6">
                  <Layers className="mb-4 h-10 w-10 md:h-12 md:w-12 text-[#4285F4]" />
                  <p className="font-display text-base md:text-lg font-bold tracking-tight text-[#222]">
                    No products found
                  </p>
                  <p className="mt-2 text-sm text-[#6a6a6a] max-w-[260px]">
                    {searchQuery
                      ? `No products matched "${searchQuery}".`
                      : "No products are available for this category yet."}
                  </p>
                </div>
              )}
            </>
          )}

          {/* Sectors tab */}
          {activeTab === "sectors" && selectedProduct && (
            <>
              {filteredSectors.length > 0 ? (
                <div className="space-y-2 md:space-y-3">
                  {chunk(filteredSectors, 10).map((row, i) => (
                    <div key={i} className="-mx-3 md:-mx-10 flex gap-2 md:gap-3 overflow-x-auto px-3 md:px-10 pb-1 md:pb-2">
                      {row.map((sector) => {
                        const url = `${selectedProduct.url}/${sector.id}`;
                        const favItem: FavouriteItem = {
                          url, name: `${selectedProduct.name} \u2014 ${sector.name}`,
                          productId: selectedProduct.id, sectorId: sector.id,
                          productName: selectedProduct.name, productColor: selectedProduct.color,
                          productBg: selectedProduct.bg, productIcon: selectedProduct.icon,
                        };
                        return (
                          <div key={sector.id} className="w-[235px] flex-shrink-0">
                            <ProductCard
                              id={sector.id} name={sector.name} color={sector.color}
                              bg={`${sector.color}18`} url={url} icon="circle"
                              categoryLabel={sector.name}
                              isFavourited={isFavourited(url)} favouriteItem={favItem}
                              onClick={() => handleSectorClick(sector.id, sector.name)}
                              onToggleFavourite={() => handleToggleFavourite(favItem)}
                              compact
                            />
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-10 text-center text-sm text-[#999]">No sectors found</p>
              )}
            </>
          )}

          {/* Favourites tab */}
          {activeTab === "favourites" && (
            <>
              {filteredFavourites.length > 0 ? (
                <div className="space-y-7 md:space-y-10">
                  {favouritesByGroup.map(({ sectorId, label, items }) => (
                    <div key={sectorId}>
                      <div className="mb-2.5 md:mb-4 flex items-center justify-between">
                        <h2 className="font-display text-[15px] md:text-xl font-bold tracking-tight text-gray-900">{label}</h2>
                      </div>
                      <div className="space-y-2 md:space-y-3">
                        {chunk(items, 10).map((row, i) => (
                          <div key={i} className="-mx-3 md:-mx-10 flex gap-2 md:gap-3 overflow-x-auto px-3 md:px-10 pb-1 md:pb-2">
                            {row.map((fav) => (
                              <div key={fav.url} className="w-[235px] flex-shrink-0">
                                <ProductCard
                                  id={fav.productId + (fav.sectorId || "")} name={fav.name}
                                  color={fav.productColor} bg={fav.productBg} url={fav.url}
                                  icon={fav.productIcon} categoryLabel={getSectorLabel(products.find((p) => p.id === fav.productId)?.group)} isFavourited={true} favouriteItem={fav}
                                  onClick={() => handleFavouriteClick(fav)}
                                  onToggleFavourite={() => handleToggleFavourite(fav)}
                                  compact
                                />
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pb-20 pt-24 text-center px-6">
                  <Heart className="mb-4 h-10 w-10 md:h-12 md:w-12 text-[#DB4437]" />
                  <p className="font-display text-base md:text-lg font-bold tracking-tight text-[#222]">
                    {searchQuery ? "No favourites matched" : "No favourites yet"}
                  </p>
                  <p className="mt-2 text-sm text-[#6a6a6a] max-w-[260px]">
                    {searchQuery
                      ? "Try a different search."
                      : "Tap the heart on any product to save it here for quick access."}
                  </p>
                </div>
              )}
            </>
          )}

          {/* My Products tab (recent) */}
          {activeTab === "recent" && (
            <>
              {filteredRecents.length > 0 ? (
                <div className="space-y-7 md:space-y-10">
                  {recentsByGroup.map(({ sectorId, label, items }) => (
                    <div key={sectorId}>
                      <div className="mb-2.5 md:mb-4 flex items-center justify-between">
                        <h2 className="font-display text-[15px] md:text-xl font-bold tracking-tight text-gray-900">{label}</h2>
                      </div>
                      <div className="space-y-2 md:space-y-3">
                        {chunk(items, 10).map((row, i) => (
                          <div key={i} className="-mx-3 md:-mx-10 flex gap-2 md:gap-3 overflow-x-auto px-3 md:px-10 pb-1 md:pb-2">
                            {row.map((rec) => (
                              <div key={rec.url} className="w-[235px] flex-shrink-0">
                                <ProductCard
                                  id={rec.productId + (rec.sectorId || "")} name={rec.name}
                                  color={rec.productColor} bg={rec.productBg} url={rec.url}
                                  icon={rec.productIcon} categoryLabel={getSectorLabel(products.find((p) => p.id === rec.productId)?.group)} isFavourited={isFavourited(rec.url)}
                                  favouriteItem={rec}
                                  onClick={() => handleFavouriteClick(rec)}
                                  onToggleFavourite={() => handleToggleFavourite(rec)}
                                  compact
                                />
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pb-20 pt-24 text-center px-6">
                  <Clock className="mb-4 h-10 w-10 md:h-12 md:w-12 text-[#4285F4]" />
                  <p className="font-display text-base md:text-lg font-bold tracking-tight text-[#222]">
                    {searchQuery ? "No matches found" : "No products visited yet"}
                  </p>
                  <p className="mt-2 text-sm text-[#6a6a6a] max-w-[260px]">
                    {searchQuery
                      ? "Try a different search."
                      : "Products you visit will appear here."}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <HubFooter />
      <NavFlash active={navFlashActive} product={navFlashProduct} label={navFlashLabel} />
    </div>
  );
}
