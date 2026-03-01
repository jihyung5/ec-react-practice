import { useState } from "react";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";
import "./App.css";

function App() {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  // カテゴリ絞り込み
  const filteredProducts =
    category === "all"
      ? products
      : products.filter((item) => item.category === category);

  // 並び替え
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "priceLow") return a.price - b.price;
    if (sort === "priceHigh") return b.price - a.price;
    return 0;
  });
  
  //モーダル
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 表示件数
  const [visibleCount, setVisibleCount] = useState(8);

  const categoryLabel = {
    all: "すべて",
    tops: "トップス",
    pants: "パンツ",
    bag: "バッグ",
    accessary: "アクセサリー"
  };
  // ローディング演出
  const [loading, setLoading] = useState(true);

  return (
    <div className="container">
      <h1>模擬EC</h1>

      {/* フィルター */}
      <div className="controls">

      {/* 左側 */}
      <div className="controls-left">
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="all">すべて</option>
          <option value="tops">トップス</option>
          <option value="pants">パンツ</option>
          <option value="bag">バッグ</option>
          <option value="accessary">アクセサリー</option>
        </select>

        <select onChange={(e) => setSort(e.target.value)}>
          <option value="default">並び替え</option>
          <option value="priceLow">価格が安い順</option>
          <option value="priceHigh">価格が高い順</option>
        </select>
      </div>

      {/* 右側 */}
      <div className="controls-right">
        <p>カテゴリ: {categoryLabel[category]}</p>
        <p>{sortedProducts.length}件</p>
      </div>

    </div>

      

      {/* 商品一覧 */}
      <div className="grid">
      {sortedProducts.slice(0, visibleCount).map((item) => (
        <div key={item.id} onClick={() => setSelectedProduct(item)}>
          <ProductCard product={item} />
        </div>
      ))}
      </div>
      
      {/* モーダル表示 */}
      {selectedProduct && (
        <div className="modal" onClick={() => setSelectedProduct(null)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <h2>{selectedProduct.name}</h2>
            <p>¥{selectedProduct.price.toLocaleString()}</p>

            <button onClick={() => setSelectedProduct(null)}>閉じる</button>
          </div>
        </div>
      )}

      {visibleCount < sortedProducts.length && (
        <div className="more-btn">
          <button
            className="loadMore"
            onClick={() => setVisibleCount(visibleCount + 8)}
          >
            もっと見る
          </button>
        </div>
      )}
      
    </div>  
  );
}

export default App;