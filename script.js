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

    // 3. 聯絡表單防呆與發送 (支援 Formspree 等第三方 API)
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    
    // ★ 請將這裡換成你在 Formspree 註冊後取得的 Endpoint URL ★
    // 例如: "https://formspree.io/f/xyzababc"
    const formspreeEndpoint = "https://formspree.io/f/xnjgdebp"; 
    
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
            submitBtn.innerText = "發送中...";
            submitBtn.disabled = true;

            // 準備要傳送的資料
            const formData = new FormData();
            formData.append("公司名稱", orgName);
            formData.append("聯絡人姓名", contactName);
            formData.append("Email", email);
            formData.append("預估賽事規模", eventSize);
            formData.append("需求說明", message);

            // 如果你還沒有設定 Formspree，這段會只跳出提示並清空表單
            if (formspreeEndpoint === "填入你的_Formspree_API_網址") {
                setTimeout(() => {
                    alert(`【展示模式】感謝 ${contactName} 的詢問！這封信預計會寄到 jekoo.intelligent@gmail.com。請開發者記得替換 API 網址！`);
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 800);
                return;
            }

            // 實際發送資料到第三方信箱服務
            fetch(formspreeEndpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    alert(`感謝 ${contactName} 的詢問！捷庫智能團隊已收到您的資訊，將盡快與您聯繫！`);
                    contactForm.reset();
                } else {
                    alert("抱歉，發送過程中出現問題，請直接發送 Email 至 jekoo.intelligent@gmail.com");
                }
            }).catch(error => {
                alert("網路連線錯誤，請直接發送 Email 至 jekoo.intelligent@gmail.com");
            }).finally(() => {
                // 恢復按鈕狀態
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

});
