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


## 修改日期：2026-03-26

---

### 1. 檔案架構重構：CSS 模組化拆分

**修改與新增說明：**
[cite_start]將原本單一的 `style.css` 拆分為三個獨立的檔案：`global.css`、`hero.css` 與 `components.css` [cite: 13-15, 820]。

**功能與用意：**
舊版將所有樣式集中在一個檔案中，隨著專案增長容易造成維護困難。新版採用模組化架構，將全域變數/共用元件（global）、首頁視覺區塊（hero）以及獨立組件/表單（components）分開管理，大幅提升了程式碼的可讀性與後續維護的擴充性。

**程式碼 (HTML `<head>` 區塊變更)：**
```html
<link rel="stylesheet" href="style.css">

<link rel="stylesheet" href="css/global.css">
<link rel="stylesheet" href="css/hero.css">
<link rel="stylesheet" href="css/components.css">
```

---

### 2. 首頁 Hero 區塊：視覺比例與無障礙 (a11y) 優化

**修改與新增說明：**
1. [cite_start]頂部圖片區塊 (`.hero-images-top`) 的高度從舊版的固定 `400px` [cite: 878] [cite_start]改為響應式的 `35vw`，並加入 `max-height: 40vh` 限制 [cite: 444, 445]。
2. [cite_start]大標題加入了 `<span class="visually-hidden">` 隱藏文字 [cite: 46]。
3. [cite_start]輪播圖 (`.hero-gallery`) 的每張圖片上方新增了 `.qa-caption-box` 文字標籤 [cite: 51, 824]。

**功能與用意：**
* **視覺比例：** 改用 `vw` 與 `vh` 單位取代固定像素，確保頂部橫幅在各種不同尺寸的螢幕上都能維持完美的長寬比，且不會佔用過多垂直空間。
* **SEO 與無障礙體驗：** 透過 `.visually-hidden` 隱藏額外的描述文字（例如 "AI Chatbot:"），這些文字在視覺上不可見，但能被搜尋引擎爬蟲與螢幕閱讀器讀取，提升網站無障礙與 SEO 分數。
* **資訊清晰度：** 為原本純圖片的展示區加上文字標籤（如「即時氣象查詢」），讓使用者一眼就能理解該圖片代表的 AI 功能。

**程式碼 (CSS & HTML 變更)：**
```css
/* 新版 hero.css - 圖片高度響應式調整 */
.hero-images-top {
    /* 舊版：height: 400px; */
    height: 35vw; 
    max-height: 40vh; /* 確保最大高度不超過螢幕 40% */
}

/* 新版 hero.css - 新增無障礙隱藏類別 */
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
```
```html
<h1 class="hero-title">
    <span class="visually-hidden">捷庫智能(Jekoo Al)Al Chatbot: </span>Al賽事智慧助理
</h1>

<div class="hero-item">
    <div class="qa-caption-box">
        <p class="qa-caption-text">即時氣象查詢</p>
    </div>
    <img src="images/QA_weather.png" alt="天氣截圖" class="full-img" />
</div>
```

---

### 3. 首頁 Hero 區塊：新增 iOS 無縫線性無限循環跑馬燈 (JS)

**修改與新增說明：**
[cite_start]在新版 JS 中，為 `.hero-gallery` 新增了一套完整的線性循環捲動邏輯，包含浮點數精準計算、元素複製 (`cloneNode`)，以及針對觸控裝置的慣性滑動保護機制 [cite: 734-818]。

**功能與用意：**
舊版僅使用 CSS 排版，圖片靜態呈現。為了增加首頁的動態科技感，導入了無限跑馬燈。特別針對 iOS (Safari) 瀏覽器在處理捲軸 `scrollLeft` 時會捨去小數點導致動畫卡頓或破圖的問題，新版 JS 使用獨立變數 `exactScrollLeft` 來強制記錄與同步浮點數，確保在所有裝置上都能實現完美的無縫線性滑動。

**程式碼 (新版 JS 核心邏輯)：**
```javascript
// [終極修復版] 支援 iOS 無縫線性無限循環跑馬燈
const scrollSpeed = 0.8;
let exactScrollLeft = 0; // iOS 修復核心：用獨立變數精準紀錄浮點數位置

function startLinearScroll() {
    if (!isPaused) {
        exactScrollLeft += scrollSpeed;
        gallery.scrollLeft = exactScrollLeft; // 將精準數值賦予瀏覽器

        const firstClone = gallery.querySelector('.clone-item');
        if (firstClone) {
            const resetPoint = firstClone.offsetLeft - gallery.firstElementChild.offsetLeft;
            // 當捲軸剛好滑到複製品的位置時，瞬間把捲軸拉回起點
            if (gallery.scrollLeft >= resetPoint) {
                gallery.scrollLeft -= resetPoint;
                exactScrollLeft -= resetPoint; // 同步重置變數
            }
        }
    }
    animationId = requestAnimationFrame(startLinearScroll);
}
```

---

### 4. 全新區塊：新增「標準化導入流程」(`<section id="process">`)

**修改與新增說明：**
[cite_start]在「痛點解決」與「核心模組」區塊之間，全新插入了一個 ID 為 `process` 的區塊，使用四步驟的網格卡片呈現 [cite: 109, 831]。

**功能與用意：**
舊版網頁缺乏引導客戶了解合作步驟的資訊。新增此區塊能以具象化的 4 個標準化步驟（需求評估 $\rightarrow$ 知識庫建置 $\rightarrow$ 驗收測試 $\rightarrow$ 服務上線）向 B2B 客戶展示導入過程，並強調「24 小時內完成建置」的商業價值，有效降低客戶對技術導入門檻的疑慮。

**程式碼 (新版 HTML & CSS)：**
```html
<section class="process section-padding" id="process">
    <div class="container">
        <h2 class="section-title fade-in">
            標準化導入流程<br>
            <span style="color: #007bff; font-size: 0.85em;">極速上線! 24 小時內完成專屬AI建置</span>
        </h2>
        <div class="process-grid-modern">
            <div class="process-card-modern fade-in">
                <div class="step-badge-modern">01</div>
                <div class="process-icon-modern"><i class="fas fa-handshake"></i></div>
                <h3>需求評估與資料交付</h3>
            </div>
            </div>
    </div>
</section>
```
```css
/* 新版 components.css - 現代化流程網格 */
.process-grid-modern { 
    display: grid; 
    grid-template-columns: repeat(4, 1fr); 
    gap: 2rem; 
    position: relative; 
}
.process-card-modern { 
    background: #ffffff; 
    border-radius: 20px; 
    text-align: center; 
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04); 
    transition: all 0.4s;
}
```

---

### 5. 聯絡表單：B2B 體驗重構與防呆邏輯優化

**修改與新增說明：**
1. [cite_start]移除了舊版強制的 `<select id="eventSize">` (預估賽事規模) 欄位 [cite: 842]。
2. [cite_start]新增了 `.contact-method-section`，包含企業 Email、聯絡電話、LINE ID 三個選填欄位 [cite: 201-216]。
3. [cite_start]JS 表單送出邏輯從「Email 必填」改為「Email、電話、Line ID 三者至少填寫一項」[cite: 670, 973]。
4. [cite_start]更新了傳遞給 n8n Webhook 的 JSON 格式 (`payload`) [cite: 688, 976]。

**功能與用意：**
舊版的表單欄位限制較為死板，強制要求填寫 Email 與賽事規模可能會降低潛在客戶的填寫意願。新版表單提供了更彈性的聯絡管道（支援電話與 LINE ID），並利用 JS 防呆確保客戶「至少留下一種聯絡方式」。同時，配合前端欄位的異動，更新了傳送至後端 (n8n Webhook) 的資料結構，確保資料能順利拋轉。

**程式碼 (新版 JS 變更)：**
```javascript
// 新版防呆邏輯：核心聯絡方式三擇一
if (!email && !phone && !lineId) {
    alert("請至少留下Email、聯絡電話或LINE ID其中一種聯絡方式,方便團隊回覆您!");
    return; // 中斷發送
}

// 新版 n8n Webhook 封裝格式
const payload = {
    companyName: orgName,
    contactPerson: contactName,
    email: email || "未提供",
    phone: phone || "未提供",
    lineId: lineId || "未提供",
    requirement: message || "無額外說明",
    source: "Jekoo Al官方網站"
};
```

---

### 6. 全域 UI 優化：社群連結狀態與客製化捲軸

**修改與新增說明：**
1. [cite_start]將頁尾 (Footer) 舊版的純 `<a>` 連結（Facebook, LinkedIn）改為 `<span class="disabled-social">`，並附上 `Coming soon` 標籤 [cite: 231-237, 846]。
2. [cite_start]在全域 CSS 中加入了 `::-webkit-scrollbar` 客製化滾動條樣式 [cite: 369]。

**功能與用意：**
因目前社群平台可能尚未建置完畢，將有效連結改為禁用狀態並加上提示標籤，可避免使用者點擊到無效頁面產生不佳的體驗。此外，全站導入了客製化的極簡風格滾動條，讓網站的整體科技感與細節更加一致。

**程式碼 (新版 HTML & CSS)：**
```html
<div class="social-links">
    <span class="disabled-social" title="尚未開放">
        <i class="fab fa-facebook"></i>
        <span class="coming-soon-badge">Coming soon</span>
    </span>
</div>
```
```css
/* 新版 global.css - 客製化捲軸 */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { 
    background: rgba(10, 37, 64, 0.3); 
    border-radius: 10px; 
}
```
```
