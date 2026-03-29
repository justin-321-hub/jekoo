# jekoo
---
# 修改過程紀錄
## 2026-03-16

### 新增logo

**html**:

```html
<a href="#" class="logo">
    <img src="images/Jekoo_logo.png" alt="" class="logo-img">
    捷庫智能 <span>Jekoo AI</span>
</a>
```
說明：
- src="images/Jekoo_logo.png" 就是圖片的路徑；alt 是當圖片萬一破圖顯示不出來時，會出現的替代文字，目前沒有設定

**css**:

```css
/* 讓 Logo 區塊變成彈性盒子，讓圖片跟文字完美橫排並置中 */
.logo {
    display: flex;
    align-items: center; /* 垂直置中對齊 */
    gap: 10px; /* 圖片跟文字之間空出 10px 的安全距離 */
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--primary-blue);
}

/* 限制圖片的大小 */
.logo-img {
    height: 35px; /* 限制高度，你可以根據導覽列的高度自己微調這個數字 */
    width: auto;  /* 寬度設定 auto，圖片才不會變形 */
}
```
說明:
- 因為現在 Logo 這個區塊裡面同時塞了「圖片」和「文字」，如果沒有調整，它們可能會一上一下對不齊，或是圖片太大把導覽列撐破。

### 修改hero的背景

**css**:

```css
/* 首圖區 Hero */
.hero {
    /* 保持原本的 Flexbox 與高度設定 */
    height: 100vh;
    min-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--white);
    padding: 0 20px;

    /* --- 新增的背景圖片設定 --- */
    
    /* 先疊一層 40% 不透明度的黑色，再疊圖片 */
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('images/hero_bg.png');
    
    /* 2. 關鍵設定：讓圖片完美鋪滿整個區塊，且不變形 */
    background-size: cover;
    
    /* 3. 關鍵設定：讓圖片置中對齊，即使螢幕比例不同也不會跑版 */
    background-position: center;
    
    /* 4. 防止圖片重複鋪排 (當圖片太小時) */
    background-repeat: no-repeat;
    
    /* 5. 保險設定：設定一個備用背景色（防止圖片載入失敗時一片白，導致白色文字看不到） */
    background-color: var(--primary-blue);
}
```
說明:
- 改成圖片背景後，原本白色的文字可能會因為圖片顏色變得很雜亂而變得很難讀清楚，所以background-image有40%不透明度

### 在hero 和 solutions section 之間新增使用案例圖片

**html**:

```html
<section class="gallery-section" id="gallery">
    <div class="container">
        <h2 class="section-title fade-in">功能展示</h2>
        <p class="section-subtitle text-center fade-in">完整呈現資訊，滿足您的需求</p>
        
        <div class="gallery-grid">
            <div class="gallery-item fade-in">
                <div class="img-wrapper">
                    <img src="images/QA_weather.png" alt="" class="full-img">
                </div>
                <div class="item-info">
                    <h3><i class="fas fa-cloud-sun"></i> 即時天氣預報</h3>
                    <p>完整提供 36 小時天氣狀況、氣溫與穿著建議。</p>
                </div>
            </div>

            <div class="gallery-item fade-in">
                <div class="img-wrapper">
                    <img src="images/QA_contact.png" alt="" class="full-img">
                </div>
                <div class="item-info">
                    <h3><i class="fas fa-phone-alt"></i> 賽事相關聯絡</h3>
                    <p>列出重要協會與合作飯店的電話及網站連結。</p>
                </div>
            </div>

            <div class="gallery-item fade-in">
                <div class="img-wrapper">
                    <img src="images/QA_parking.png" alt="" class="full-img">
                </div>
                <div class="item-info">
                    <h3><i class="fas fa-parking"></i> 即時停車資訊</h3>
                    <p>一覽附近停車場的地址、費率及剩餘車位數。</p>
                </div>
            </div>

            <div class="gallery-item fade-in">
                <div class="img-wrapper">
                    <img src="images/QA_time.png" alt="" class="full-img">
                </div>
                <div class="item-info">
                    <h3><i class="fas fa-calendar-check"></i> 賽事報名時間</h3>
                    <p>清晰標明開始與截止時間，提醒您額滿為止。</p>
                </div>
            </div>
        </div>
    </div>
</section>
```
說明:

**css**:

```css
/* --- 功能圖片展示格 (Gallery) --- */
.gallery-section {
    padding: 80px 0;
    background: var(--bg-light);
}

.section-subtitle {
    margin-bottom: 50px;
    color: var(--text-dark);
    opacity: 0.8;
}

/* 建立一個 2x2 的網格，並在中間空出間距 */
.gallery-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 核心魔法 1：分成兩欄 */
    gap: 40px; /* 卡片之間的距離 */
}

/* 每一張卡片的設定 */
.gallery-item {
    background: var(--white);
    border-radius: 12px;
    box-shadow: var(--shadow-sm);
    overflow: hidden; /* 確保內容不會超出卡片 */
    transition: var(--transition);
}

.gallery-item:hover {
    transform: translateY(-5px); /* 滑鼠移上去時微微浮起 */
    box-shadow: var(--shadow-md);
}

/* 圖片的收納盒 (藍紫色區塊) */
.img-wrapper {
    padding: 20px;
    background: #E8F0FF; 
    display: flex;
    justify-content: center;
    align-items: center;
    
    /* 核心修改：把 min-height 改成絕對固定的 height */
    height: 280px; /* 這個數字你可以根據截圖的實際感覺微調 (例如 250px 或 300px) */
}

/* 完美顯現全圖的核心設定 */
.full-img {
    /* 核心修改：強制圖片的寬高最高只能等於藍紫色框框 (扣掉 padding 後) 的大小 */
    width: 100%;
    height: 100%; 
    
    /* object-fit: contain 會讓圖片在不變形、不裁切的情況下，盡可能放大到碰到框框邊緣為止 */
    object-fit: contain; 
    display: block;
}

/* 圖片下方的文字說明 */
.item-info {
    padding: 25px;
}

.item-info h3 {
    font-size: 1.3rem;
    color: var(--primary-blue);
    margin-bottom: 10px;
}

.item-info h3 i {
    margin-right: 8px; /* 圖示跟文字之間空一點 */
    color: var(--accent-blue);
}

.item-info p {
    font-size: 1rem;
    color: var(--text-dark);
    line-height: 1.6;
}

/*  手機版 RWD 排版：寬度不足時，改成一欄 */
@media (max-width: 768px) {
    .gallery-grid {
        grid-template-columns: 1fr; /* 改成直排一欄 */
    }
}
```
說明:
- (height: 280px)：我們直接下達死命令，不管圖片多高多矮，藍紫色的框框就是剛好 280px 高。這樣一來，所有的卡片就都會長得一模一樣高了！
- (width: 100%, height: 100%)：這告訴圖片「你的極限就是這個藍紫色的空間」。
- (object-fit: contain)：這是最聰明的屬性。它會幫你計算：如果圖片太寬，就左右貼齊，上下自動留出藍紫色的縫隙；如果圖片太高，就上下貼齊，左右留縫隙。絕對不變形、絕對不裁切！
---
## 2026-03-16
### 修改hero介面，把案例圖片合併到hero中

**html**:

```html
    <section class="hero-composite" id="hero">
        <div class="hero-images-top">
            <img src="images/hero_run.png" alt="跑步運動員" class="hero-img">
            <img src="images/hero_swim.png" alt="游泳運動員" class="hero-img">
            <img src="images/hero_bike.png" alt="單車運動員" class="hero-img">
            
            <!-- 新增這個外層 div -->
            <div class="hero-text-overlay">
                <p class="hero-subtitle">專為中大型運動賽事打造的</p>
            </div>
        </div>

        <div class="hero-content">
            <div class="hero-gallery fade-in">
            <div class="hero-item">
                <img src="images/QA_weather.png" alt="天氣截圖" class="full-img" />
            </div>
            <div class="hero-item">
                <img src="images/QA_contact.png" alt="聯絡截圖" class="full-img" />
            </div>
            <div class="hero-item">
                <img src="images/QA_parking.png" alt="停車截圖" class="full-img" />
            </div>
            <div class="hero-item">
                <img src="images/QA_time.png" alt="時間截圖" class="full-img" />
            </div>
            </div>

            <div class="hero-text-main fade-in">
            <h1 class="hero-title">AI 賽事智慧助理</h1>
            </div>

            <a href="#contact" class="cta-btn fade-in"
            >立即諮詢 <i class="fas fa-arrow-right"></i
            ></a>
        </div>
    </section>
```
說明:
- 刪除了 gallery-section

```css
/* --- 複合式 Hero 介面 (Hero Composite) --- */
.hero-composite {
  height: 100vh;
  min-height: 800px;
  padding-top: 68px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #0A2540 0%, #1A3A5F 100%);
  color: var(--white);
  position: relative;
  overflow: hidden;
}

/* 頂部圖片並排 (新增 position: relative) */
.hero-images-top {
    position: relative;
    display: flex;
    width: 100%;
    height: 400px;
}

.hero-img {
  flex: 1;
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: center center;
  display: block;
}

/* 核心修改：增加深色半透明遮罩，讓圖片變暗/透明 */
.hero-images-top::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* 使用深藍色，透明度 0.5 (可依需求調整 0.0 ~ 1.0) */
    background-color: rgba(0, 0, 0, 0.5); 
    z-index: 1; /* 蓋在圖片上面 */
}

/* 1. 黃色子標題 (修改定位方式) */
/* 簡化 subtitle 的樣式，不需要再寫定位座標 */
.hero-subtitle {
    color: #F8D951;
    font-size: 3rem;
    font-weight: 600;
    letter-spacing: 2px;
    margin: 0;
    white-space: nowrap;
    text-shadow: 0 2px 15px rgba(0, 0, 0, 0.9);
    /* 這裡不需要寫 top, left 或 transform 了！ */
}

/* 新增：這個層會鋪滿整個圖片區域，並負責把內容置中 */
.hero-text-overlay {
    position: absolute;
    top: 30%;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;           /* 使用 Flexbox */
    justify-content: center; /* 水平置中 (以全文字為中心) */
    align-items: center;     /* 垂直置中 */
    z-index: 10;
    pointer-events: none;    /* 讓滑鼠點擊可以穿透文字層，不影響圖片 */
}

/* 文字內容區 (移除 top padding，因為 subtitle 移走了) */
.hero-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 5px 0 5px;
}

/* 2. 四張功能截圖卡片 */
.hero-gallery {
  display: flex;
  gap: 15px;
  padding-top: 20px;
  margin-bottom: 5px;
  max-width: 100%;
}

.hero-item {
  background: rgba(232, 240, 255, 0.15);
  border-radius: 8px;
  padding: 0px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 230px;
  width: 100%;
}

.full-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}

/* 3. 大標題與爆炸框 */
.hero-text-main {
  position: relative;
  margin-bottom: 20px;
  padding: 0 50px;
}

/* 大漸層標題 */
.hero-title {
  font-size: 2.5rem;
  line-height: 1.2;
  font-weight: 900;
  position: relative;
  z-index: 2;
  padding-bottom: 20px;

  background: linear-gradient(180deg, #FFFFFF 0%, #D8F2FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  letter-spacing: 1px;
}

/* 4. CTA 按鈕 */
.cta-btn {
  background: var(--primary-green, #28C76F);
  color: var(--white, #ffffff) !important;
  padding: 15px 40px;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 30px;
  box-shadow: 0 10px 20px rgba(40, 199, 111, 0.3);
  transition: all 0.3s ease;
  display: inline-block;
  text-decoration: none;
  z-index: 3;
  position: relative;
}

.cta-btn:hover {
  background: #21a55c;
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(40, 199, 111, 0.5);
}

/* 📱 手機版 RWD 排版 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.2rem;
  }
  .hero-subtitle {
    font-size: 1.1rem;
    /* 手機版可能需要調整定位或寬度，視情況而定 */
  }

  .hero-gallery {
    flex-direction: column;
    gap: 20px;
  }
}
```
說明:
- 修改了.hero的部分
- 新增了遮罩可以改變透明度(.hero-images-top::after)
- .hero-text-overlay 控制圖片上層的黃色文字

### 修改半視窗或手機時hero的顯示效果

**css**:

```css
/* 📱 手機版 RWD 排版 */
@media (max-width: 768px) {

    .hero-images-top {
        height: 250px; 
    }

    .hero-text-main {
        margin-top: 15px;
        margin-bottom: 20px;
    }

    .hero-title {
        font-size: 2.2rem;
    }

    .hero-subtitle {
        font-size: 1.5rem; /* 手機版縮小，才不會超出圖片範圍 */
        white-space: normal; /* 允許自動換行，避免太長切掉 */
        line-height: 1.4;
    }

    .hero-text-overlay {
        /* 手機版圖片較矮，間距也要跟著縮小，才不會擠到中間 */
        padding-bottom: 30px; 
    }

    .hero-gallery {
        flex-direction: column;
        gap: 20px;
    }

    .hero-item {
        /* 極窄螢幕改為一排一個 */
        flex: 1 1 100%; 
    }

    .cta-btn {
        padding: 10px 25px;
        font-size: 1rem;
        width: 80%; /* 手機版按鈕可以寬一點比較好點擊 */
    }
}
```
說明:

### 漢堡選單的功能和樣式

**css**:

```css
@media (max-width: 768px) {
    /* 讓選單預設隱藏，並定位在導覽列下方 */
    .nav-links {
        display: none; /* 預設隱藏 */
        flex-direction: column;
        position: absolute;
        top: 68px; /* navbar 的高度 */
        left: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 20px 0;
        box-shadow: 0 10px 15px rgba(0,0,0,0.1);
        gap: 20px;
        text-align: center;
    }

    /* 當 JS 加入 .active 類別時顯示選單 */
    .nav-links.active {
        display: flex;
    }

    .nav-btn {
        width: 80%; /* 讓按鈕在手機版寬一點 */
        margin: 0 auto;
    }
}
```
說明:

**js**:

```js
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // 順便切換圖示：從三條線變成 X (如果你是用 FontAwesome)
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// 點擊選單連結後，自動關閉選單 (UX 優化)
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        if(icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});
```

說明:
- 在 document.addEventListener 中心增

### 添加回到最頂部的按鈕

**html**:

```html
<div id="back-to-top" class="back-to-top">
    <i class="fas fa-chevron-up"></i>
</div>
```
說明:
- 在footer下方，body結束前新增

**css**:

```css
/* --- 回到頂部按鈕樣式 --- */
.back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--accent-blue);
    color: var(--white);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: var(--shadow-md);
    z-index: 1000;
    
    /* 動態效果 */
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px); /* 讓它有一點從下面浮上來的感覺 */
    transition: all 0.3s ease; /* 控制出現的動畫速度 */
    z-index: 1000;
}

.back-to-top.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.back-to-top:hover {
    background: var(--primary-blue);
    transform: translateY(-5px);
}

/* 手機版稍微縮小，避免擋到內容 */
@media (max-width: 768px) {
    .back-to-top {
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
    }
}
```
說明:

**js**:

```js
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    // 當視窗捲動超過 400px 時顯示按鈕
    if (window.pageYOffset > 400) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
```
說明:
- 在document.addEventListener新增

---


2026-03-26

# 捷庫智能 Jekoo AI 官方網站修改與優化報告

本報告彙整了捷庫智能 Jekoo AI 網站最新版本的修改細節，涵蓋 HTML、CSS 與 JavaScript 的更新，說明各區塊的修改內容、程式碼對比以及其功能用意，可作為 GitHub README 的更新日誌（Changelog）參考。

---

## 🎨 1. 樣式與排版優化 (CSS)

### 修改或新增的區塊：Hero 區塊視覺遮罩與文字定位優化
**修改內容與程式碼對比**：
過去的寫法缺乏遮罩，且 `.hero-subtitle` 定位較難適應各種螢幕。新版在 `style_舊版CSS.txt` 的基礎上進行了以下更新：

```css
/* 新增：增加深色半透明遮罩，讓圖片變暗/透明 */
.hero-images-top::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 蓋在圖片上面 */
  z-index: 1; 
}

/* 修改：修正文字疊加層定位，使用 Flex 置中，並解決手機重疊問題 */
.hero-text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end; /* 將垂直對齊改為靠下 */
  padding-bottom: 60px;  /* 透過 padding-bottom 控制距離底部的距離 */
  z-index: 10;
  pointer-events: none;
  padding-left: 20px;
  padding-right: 20px;
}
```

**功能與用意**：
新增的深色半透明遮罩能壓暗背景圖片，使黃色的副標題文字（#F8D951）更醒目易讀。重構 `.hero-text-overlay` 則是為了解決響應式網頁（RWD）的痛點，改用 Flexbox 的置底對齊搭配 `padding-bottom`，可確保文字在各種螢幕高度下都能安穩維持在畫面下方約 1/3 的安全區，避免在手機版與其他元素重疊。

### 修改或新增的區塊：Hero 截圖卡片響應式排版
**修改內容與程式碼對比**：
針對展示天氣、聯絡、停車、時間等功能的四張截圖卡片容器進行了換行邏輯修改。

```css
/* 修改前：缺乏換行與最大寬度限制 */
/* 修改後：新增 flex-wrap 與 max-width */
.hero-gallery {
  display: flex;
  flex-wrap: wrap; /* 核心修改：允許換行 */
  justify-content: center; /* 換行後依然置中 */
  gap: 15px;
  padding: 20px 10px 0;
  margin-bottom: 5px;
  width: 100%;
  max-width: 1200px; /* 限制最大寬度防止在大螢幕拉得太開 */
}
```

**功能與用意**：
此功能用意在於優化多螢幕瀏覽體驗。加入 `max-width: 1200px` 避免大螢幕將卡片拉得過開；而加入 `flex-wrap: wrap` 則是防止在手機或平板螢幕較窄時，四張卡片因無法換行而互相擠壓破版，維持版面專業度。

---

## 🏗️ 2. 結構與內容擴充 (HTML)

### 修改或新增的區塊：Hero 區塊 HTML 結構更新
**修改內容與程式碼對比**：
在首頁最上方的 Hero 圖片區塊中，為副標題新增了獨立的外層容器。

```html
<!-- 新版 HTML 結構 -->
<div class="hero-images-top">
  <img src="images/hero_run.png" alt="跑步運動員" class="hero-img">
  <img src="images/hero_swim.png" alt="游泳運動員" class="hero-img">
  <img src="images/hero_bike.png" alt="單車運動員" class="hero-img">
  
  <!-- 新增這個外層 div -->
  <div class="hero-text-overlay">
    <p class="hero-subtitle">專為中大型運動賽事打造的</p>
  </div>
</div>
```

**功能與用意**：
配合前述的 CSS Flexbox 定位更新，將文字透過 `<div class="hero-text-overlay">` 獨立包裝，讓文字層與底下的三張圖片層在結構上徹底解耦。如此一來，文字的置中與置底排版就不會干擾到背景圖片的並列顯示。

### 修改或新增的區塊：新增「標準化導入流程」段落
**修改內容**：
在最新版的網站內容中，新增了完整的標準化導入流程介紹。

```html
<!-- 新增的段落內容架構 -->
<h2>標準化導入流程 極速上線！ 24 小時內 完成專屬 AI 建置</h2>
<div class="workflow-steps">
  <!-- 01 需求評估與資料交付 -->
  <!-- 02 AI 知識庫建置與模型調校 -->
  <!-- 03 驗收測試與回饋優化 -->
  <!-- 04 服務上線與現場部署 -->
</div>
```

**功能與用意**：
主打「24 小時內極速上線」並列出明確的四個階段（需求評估、知識庫建置、驗收測試、上線部署），功能在於將抽象的技術導入具象化。其用意是化解 B2B 賽事主辦方對於導入 AI 系統可能曠日廢時的疑慮，增強商業信任並縮短決策週期。

### 修改或新增的區塊：B2B 聯絡表單欄位優化
**修改內容與程式碼對比**：
大幅放寬了表單的必填條件。舊版表單嚴格要求填寫「聯絡人姓名 *」、「企業 Email *」，且強制在下拉選單選擇「預估賽事規模 *」。新版則進行了彈性優化。

```html
<!-- 修改前：嚴格限制 -->
<label for="contactName">聯絡人姓名 *</label>
<label for="email">企業 Email *</label>
<label for="eventSize">預估賽事規模 *</label>

<!-- 修改後：彈性多元 -->
<label for="contactName">聯絡人姓名/暱稱 *</label>
<p>以下聯絡方式請至少填寫一項，方便團隊回覆您：</p>
<!-- 提供 企業 Email、聯絡電話、LINE ID 擇一填寫 -->
<!-- 移除「預估賽事規模」必填下拉選單 -->
```

**功能與用意**：
此修改極大化了表單的使用者體驗（UX）。將實名制放寬為「姓名/暱稱」，並新增「聯絡電話、LINE ID」等多渠道讓客戶擇一填寫，同時移除繁瑣的賽事規模必填題。用意是降低潛在客戶填寫表單的門檻與隱私壓力，進而提升「送出諮詢」的轉換率。

---

## ⚡ 3. 網頁互動功能建立 (JavaScript)

### 修改或新增的區塊：新增網頁互動與動畫核心邏輯
**修改內容與程式碼對比**：
舊版的 `script_舊版js.txt` 中完全沒有實質邏輯，僅有一個空的 DOMContentLoaded 監聽器。新版則擴充了完整的前端互動功能。

```javascript
// 修改前 (script_舊版js.txt)
document.addEventListener("DOMContentLoaded", () => {
});

// 修改後 (新增的架構邏輯)
document.addEventListener("DOMContentLoaded", () => {
  // 1. 建立 Intersection Observer 實作捲動顯示動畫 (配合 .fade-in 與 .visible)
  // 2. 實作「回到頂部 (Back to Top)」按鈕的滾動監聽與點擊平滑捲動功能
  // 3. 實作手機版漢堡選單 (Hamburger) 的展開與收合切換邏輯
  // 4. 攔截 B2B 聯絡表單的預設 submit 行為，防止頁面重新整理
});
```

**功能與用意**：
*   **捲動動畫**：補足了原本缺失的 JavaScript 邏輯，透過監控視窗位置觸發 CSS 動畫，讓頁面元素在捲動時滑順浮現，提升網站現代感。
*   **回到頂部與手機選單**：確保使用者在閱讀長篇幅介紹或使用手機瀏覽時，擁有良好的導覽操作體驗。
*   **表單攔截**：阻止表單送出時立刻重新整理頁面，不僅優化了互動體驗，也為後續串接非同步 API（如發送諮詢信件）建立了基礎架構。
