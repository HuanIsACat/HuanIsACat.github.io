/**
 * Huan's Adventure Map - Data Configuration
 */

const adventureData = [
    {
        id: 'profile',
        x: '45%', y: '50%',
        iconSrc: 'images/main/warrior.png',
        isLarge: true, // 标记为大尺寸卡片
        title: { zh: '冒险者档案', en: 'Adventurer Profile' },
        subtitle: { zh: 'Huan the Nerd (Lv 10)', en: 'Huan the Nerd (Lv 10)' },
        desc: {
            zh: '一个带有“金鱼的记忆”诅咒的冒险者，喜欢把一切琐碎记录在卷轴上。',
            en: 'An adventurer cursed with the Memory of a Goldfish, recording every triviality on scrolls.'
        },
        stats: [
            { label: 'STR', val: 16 }, { label: 'CON', val: 14 }, { label: 'CHA', val: 12 }
        ],
        details: [
            {
                label: { zh: '语言', en: 'Languages' },
                val: { 
                    zh: '中文(母语), 英语(流利), 意大利语(中级), 法语/德语/爱沙尼亚语(入门)', 
                    en: 'Chinese(Native), English(Fluent), Italian(Inter.), French/German/Estonian(Beginner)' 
                }
            },
            {
                label: { zh: '熟练项', en: 'Proficiencies' },
                val: { 
                    zh: '游戏本地化，羽毛球，桌游，跑团', 
                    en: 'Game Localization, Badminton, Board Games, TRPG' 
                }
            }
        ],
        footer: { zh: '❤ 魔宠：白猫囧囧', en: '❤ Familiar: Jiong Jiong' }
    },
    {
        id: 'dreams',
        x: '29%', y: '45%',
        iconSrc: 'images/main/crystal.png',
        title: { zh: '梦境幻象', en: 'Dream Visions' },
        desc: { 
            zh: '来自其他时间线的记忆碎片', 
            en: 'Memories from other timelines' 
        },
        links: [
            { url: 'dream-journals.html', zh: '✦ 入梦', en: '✦ Sleep' }
        ]
    },
    {
        id: 'travel',
        x: '90%', y: '42%',
        iconSrc: 'images/main/scroll.png',
        title: { zh: '尘世行纪', en: 'Mundane Journal' },
        desc: { 
            zh: '来自现实世界的浮光掠影。', 
            en: 'Fragments from the journey in the real world.' 
        },
        links: [
            { url: 'real-life-journals.html', zh: '✦ 翻阅', en: '✦ Read' }
        ]
    },
    {
        id: 'familiar',
        x: '50%', y: '50%',
        iconSrc: 'images/main/cat.png',
        title: { zh: '魔宠观察档案', en: 'Familiar Observation' },
        desc: { 
            zh: '名为“囧囧”的魔宠的观察笔记。', 
            en: 'Observational notes on the familiar called Jiong Jiong.' 
        },
        links: [
            { url: 'jiong-journals.html', zh: '✦ 投喂', en: '✦ Feed' }
        ]
    },
    {
        id: 'tales',
        x: '37%', y: '77%',
        iconSrc: 'images/main/grimoire.png',
        title: { zh: '炉火轶闻', en: 'Hearthside Tales' },
        desc: { 
            zh: '炉火旁有一位老人，在讲述着惊心动魄的史诗战役与奇闻。', 
            en: 'Tales told by an elder at the hearthside about epic campaigns and legends.' 
        },
        links: [
            { url: 'campaign-logs.html', zh: '✦ 坐下聆听', en: '✦ Sit and Listen' }
        ]
    }
];

function renderMarkers() {
    const layer = document.getElementById('markersWrapper');
    if (!layer) return;
    layer.innerHTML = '';

    adventureData.forEach(item => {
        const marker = document.createElement('div');
        marker.className = 'marker';
        marker.id = 'marker-' + item.id;
        marker.style.top = item.y;
        marker.style.left = item.x;
        
        // 交互逻辑
        marker.onclick = function(e) {
            e.stopPropagation();
            const isActive = this.classList.contains('active');
            // 点击其他地方或当前图标时切换状态
            document.querySelectorAll('.marker').forEach(m => m.classList.remove('active'));
            if (!isActive) this.classList.add('active');
        };

        // 渲染内部组件
        const statsHtml = item.stats ? `<div class="stats-row">${item.stats.map(s => `<div class="stat-item"><label>${s.label}</label><span>${s.val}</span></div>`).join('')}</div>` : '';
        const linksHtml = item.links ? `<ul class="link-list">${item.links.map(l => `<li><a href="${l.url}"><span class="content-zh">${l.zh}</span><span class="content-en">${l.en}</span></a></li>`).join('')}</ul>` : '';
        const detailsHtml = item.details ? item.details.map(d => `
            <div class="card-section">
                <span class="section-label content-zh">${d.label.zh}</span>
                <span class="section-label content-en">${d.label.en}</span>
                <p class="section-value content-zh">${d.val.zh}</p>
                <p class="section-value content-en">${d.val.en}</p>
            </div>`).join('') : '';

        const sizeClass = item.isLarge ? 'card-large' : '';

        marker.innerHTML = `
            <img src="${item.iconSrc}" class="marker-img">
            <div class="card-popup ${sizeClass}">
                <div class="card-title content-zh">${item.title.zh}</div>
                <div class="card-title content-en">${item.title.en}</div>
                ${item.subtitle ? `<div class="card-subtitle content-zh">${item.subtitle.zh}</div><div class="card-subtitle content-en">${item.subtitle.en}</div>` : ''}
                <div class="card-content">
                    <p class="content-zh">${item.desc.zh}</p>
                    <p class="content-en">${item.desc.en}</p>
                    ${statsHtml}
                    ${detailsHtml}
                    ${linksHtml}
                    ${item.footer ? `<p style="text-align:center;margin-top:10px;"><span class="content-zh">${item.footer.zh}</span><span class="content-en">${item.footer.en}</span></p>` : ''}
                </div>
            </div>
        `;
        layer.appendChild(marker);
    });
}

// 全局点击关闭弹窗
document.addEventListener('click', () => {
    document.querySelectorAll('.marker').forEach(m => m.classList.remove('active'));
});

// 页面加载运行
window.onload = renderMarkers;