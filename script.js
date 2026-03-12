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

    // 3. 聯絡表單防呆與發送 (串接 n8n Webhook)
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
            const eventSize = document.getElementById('eventSize').value;
            const message = document.getElementById('message').value.trim();

            // 簡易防呆檢查
            if (!orgName || !contactName || !email || !eventSize) {
                alert("請填寫所有標示 '*' 的必填欄位。");
                return;
            }

            // Email 格式簡單檢查
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert("請輸入有效的企業 Email 格式。");
                return;
            }

            // 變更按鈕狀態為處理中
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "資料傳送中...";
            submitBtn.disabled = true;

            // ★ 2. 將資料打包成 JSON 格式 (n8n 解析最友善的格式) ★
            const payload = {
                companyName: orgName,
                contactPerson: contactName,
                email: email,
                eventScale: eventSize,
                requirement: message,
                source: "Jekoo AI 官方網站" // 加上來源標記，方便 n8n 後端辨識
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
});




