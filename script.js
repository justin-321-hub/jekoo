document.addEventListener("DOMContentLoaded", () => {
    
    // 1. 平滑滾動 (Smooth Scroll)
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 扣除 navbar 的高度，避免標題被遮擋
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

    // 2. 滾動淡入動畫 (Scroll Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // 當元素有 15% 進入視窗時觸發
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 若只需觸發一次，觸發後即可取消觀察
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // 4. 手機版漢堡選單切換
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // 順便切換圖示：從三條線變成 X
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
    
    // 5. 回到頂部按鈕邏輯
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
    
    // ==========================================
    // 3. 聯絡表單防呆與發送 (串接 n8n Webhook)
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    
    // ★ 1. 填入你在 n8n Webhook 節點取得的 URL ★
    const n8nWebhookUrl = "https://n8n-service-dnng.onrender.com/webhook/contact"; 
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // 阻止表單預設的重整送出行為

            // 取得欄位值
            const orgName = document.getElementById('orgName').value.trim();
            const contactName = document.getElementById('contactName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
            const lineId = document.getElementById('lineId') ? document.getElementById('lineId').value.trim() : '';
            const message = document.getElementById('message').value.trim();

            // 簡易防呆檢查：公司名稱與聯絡人姓名為必填
            if (!orgName || !contactName) {
                alert("請填寫賽事主辦單位與聯絡人姓名。");
                return;
            }

            // 🌟 核心防呆：Email、電話、Line ID 至少填寫一項
            if (!email && !phone && !lineId) {
                alert("請至少留下 Email、聯絡電話 或 LINE ID 其中一種聯絡方式，方便團隊回覆您！");
                return; // 中斷發送
            }

            // Email 格式簡單檢查 (只有在使用者有填寫 Email 時才檢查)
            if (email) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email)) {
                    alert("請輸入有效的企業 Email 格式。");
                    return;
                }
            }

            // 變更按鈕狀態為處理中
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "資料傳送中...";
            submitBtn.disabled = true;

            // ★ 2. 將資料打包成 JSON 格式 (n8n 解析最友善的格式) ★
            const payload = {
                companyName: orgName,
                contactPerson: contactName,
                email: email || "未提供",
                phone: phone || "未提供",
                lineId: lineId || "未提供",
                requirement: message || "無額外說明",
                source: "Jekoo AI 官方網站" // 加上來源標記
            };

            // 實際發送資料到 n8n Webhook
            fetch(n8nWebhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // 告訴 n8n 我們傳的是 JSON
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload) // 將 JavaScript 物件轉成 JSON 字串
            })
            .then(response => {
                // n8n Webhook 預設成功會回傳 200 OK
                if (response.ok) {
                    alert(`感謝 ${contactName} 的詢問！捷庫智能團隊已收到您的資訊，將盡快與您聯繫！`);
                    contactForm.reset(); // 清空表單
                } else {
                    alert("抱歉，發送過程中伺服器無回應，請直接發送 Email 至 jekoo.intelligent@gmail.com");
                }
            })
            .catch(error => {
                console.error("Fetch Error:", error);
                alert("網路連線錯誤，請檢查您的網路或直接發送 Email 至 jekoo.intelligent@gmail.com");
            })
            .finally(() => {
                // 恢復按鈕狀態
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

    // ==========================================
    // 6. [終極修復版] 支援 iOS 無縫線性無限循環跑馬燈
    // ==========================================
    const gallery = document.querySelector('.hero-gallery');
    
    if (gallery) {
        let isPaused = false;
        let animationId;
        let isMarqueeActive = false;
        
        // ⚙️ 速度設定 (即使設為小數點，這次 iOS 也不會卡住了)
        const scrollSpeed = 0.8; 
        
        // 🍎 iOS 修復核心：用獨立變數精準紀錄浮點數位置
        let exactScrollLeft = 0; 
        
        const originalItemCount = gallery.children.length;

        function startLinearScroll() {
            if (!isPaused) {
                // 將精準小數點累加到我們的變數中
                exactScrollLeft += scrollSpeed;
                
                // 再把計算好的數值賦予給瀏覽器 (解決 Safari 吃小數點的問題)
                gallery.scrollLeft = exactScrollLeft;
                
                // 尋找第一張「複製出來的卡片」
                const firstClone = gallery.querySelector('.clone-item');
                if (firstClone) {
                    const resetPoint = firstClone.offsetLeft - gallery.firstElementChild.offsetLeft;
                    
                    // 當捲軸剛好滑到複製品的位置時，瞬間把捲軸拉回起點
                    if (gallery.scrollLeft >= resetPoint) {
                        gallery.scrollLeft -= resetPoint; 
                        exactScrollLeft -= resetPoint; // 🍎 同步重置我們的精準變數
                    }
                }
            }
            animationId = requestAnimationFrame(startLinearScroll);
        }

        function initMarquee() {
            if (window.innerWidth <= 1400) {
                if (!isMarqueeActive) {
                    isMarqueeActive = true;
                    
                    // 複製卡片
                    const items = Array.from(gallery.children);
                    for(let i = 0; i < originalItemCount; i++) {
                        const clone = items[i].cloneNode(true);
                        clone.classList.add('clone-item'); 
                        gallery.appendChild(clone);
                    }
                    
                    // 啟動滑動
                    exactScrollLeft = gallery.scrollLeft; // 初始化位置
                    cancelAnimationFrame(animationId);
                    animationId = requestAnimationFrame(startLinearScroll);
                }
            } else {
                if (isMarqueeActive) {
                    isMarqueeActive = false;
                    cancelAnimationFrame(animationId);
                    gallery.scrollLeft = 0; 
                    exactScrollLeft = 0;
                    
                    const clones = gallery.querySelectorAll('.clone-item');
                    clones.forEach(clone => clone.remove());
                }
            }
        }

        // 🍎 iOS 修復核心：當使用者「手動滑動」時，強制同步精準變數
        gallery.addEventListener('scroll', () => {
            if (isPaused) {
                exactScrollLeft = gallery.scrollLeft;
            }
        }, { passive: true });

        // 電腦版滑鼠控制
        gallery.addEventListener('mouseenter', () => isPaused = true);
        gallery.addEventListener('mouseleave', () => {
            isPaused = false;
            exactScrollLeft = gallery.scrollLeft; // 重新接管時校正位置
        });

        // 🍎 iOS 觸控控制優化
        gallery.addEventListener('touchstart', () => {
            isPaused = true;
        }, {passive: true});
        
        gallery.addEventListener('touchend', () => {
            // iOS 慣性滑動保護：手指放開後，等待 800 毫秒(等慣性慢慢停下)再重新啟動馬達
            setTimeout(() => {
                isPaused = false;
                exactScrollLeft = gallery.scrollLeft; // 接管前先對齊目前被手滑到的位置
            }, 800);
        }, {passive: true});

        initMarquee();
        window.addEventListener('resize', () => {
            initMarquee();
        });
    }

});
