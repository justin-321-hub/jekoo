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