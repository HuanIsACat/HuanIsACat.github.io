/**
 * 语言切换模块
 * 使用方式：
 * 1. 在 HTML 中引入: <script src="lang-switch.js"></script>
 * 2. 在 body 中添加: <div class="lang-switch" onclick="switchLanguage()">
 *    <span class="content-zh"> EN </span>
 *    <span class="content-en"> 中文 </span>
 * </div>
 * 3. 在 <body> 标签添加 class="lang-zh" (默认中文) 或 class="lang-en" (默认英文)
 * 4. 在 CSS 中添加语言切换样式 (复制 lang-switch.css 的内容)
 */

function switchLanguage() {
    const body = document.body;
    const currentLang = body.classList.contains('lang-en') ? 'en' : 'zh';
    const newLang = currentLang === 'zh' ? 'en' : 'zh';
    
    // 更新 body class
    body.classList.remove(`lang-${currentLang}`);
    body.classList.add(`lang-${newLang}`);
    
    // 保存用户偏好到本地存储
    localStorage.setItem('preferredLanguage', newLang);
}

/**
 * 初始化语言设置
 * 优先顺序: 本地存储 > 浏览器语言 > 默认中文
 */
function initializeLanguage() {
    const body = document.body;
    const savedLang = localStorage.getItem('preferredLanguage');
    
    if (savedLang) {
        // 如果用户之前设置过，使用保存的语言
        body.classList.remove('lang-zh', 'lang-en');
        body.classList.add(`lang-${savedLang}`);
    } else {
        // 否则根据浏览器语言自动设置
        const browserLang = navigator.language || navigator.userLanguage;
        const lang = browserLang.startsWith('zh') ? 'zh' : 'en';
        body.classList.remove('lang-zh', 'lang-en');
        body.classList.add(`lang-${lang}`);
        localStorage.setItem('preferredLanguage', lang);
    }
}

// 页面加载时初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLanguage);
} else {
    initializeLanguage();
}
