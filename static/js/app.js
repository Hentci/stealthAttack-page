// JavaScript to handle mouseover and mouseout events
var activeMethodPill = null;
var activeScenePill = null;
var activeVidID = 0;
var select = false;

$(document).ready(function () {
    var editor = CodeMirror.fromTextArea(document.getElementById("bibtex"), {
        lineNumbers: false,
        lineWrapping: true,
        readOnly: true
    });
    editor.setSize(null, "180px");
    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    // 獲取 active 元素
    activeMethodPill = $('.method-pill.active')[0];
    activeScenePill = $('.scene-pill.active')[0];

    // 如果沒有 active scene，設定第一個可見的為 active
    if (!activeScenePill) {
        activeScenePill = $('.scene-pill:visible').first()[0];
        if (activeScenePill) {
            activeScenePill.classList.add('active');
        }
    }

    // 如果沒有 active method，設定第一個可見的為 active
    if (!activeMethodPill) {
        activeMethodPill = $('.method-pill:visible').first()[0];
        if (activeMethodPill) {
            activeMethodPill.classList.add('active');
        }
    }

    console.log("Active method pill: ", activeMethodPill);
    console.log("Active scene pill: ", activeScenePill);

    // 初始化載入第一個影片
    if (activeMethodPill && activeScenePill) {
        selectCompVideo(activeMethodPill, activeScenePill, 6);
    }
});

function selectCompVideo(methodPill, scenePill, n_views) {
    select = true;
    var viewNum = document.getElementById("compVideoValue");

    console.log("=== selectCompVideo called ===");
    console.log("methodPill:", methodPill);
    console.log("scenePill:", scenePill);
    console.log("n_views:", n_views);

    // 移除舊的 active class
    if (activeMethodPill) {
        activeMethodPill.classList.remove("active");
    }
    if (activeScenePill) {
        activeScenePill.classList.remove("active");
    }

    // 設定新的 active
    activeMethodPill = methodPill;
    activeScenePill = scenePill;
    methodPill.classList.add("active");
    scenePill.classList.add("active");

    // 獲取數據值
    var method = methodPill.getAttribute("data-value");
    var pill = scenePill.getAttribute("data-value");
    var mode = 'rgb'; // 固定使用 rgb 模式

    console.log("method:", method);
    console.log("scene:", pill);
    console.log("mode:", mode);

    // 構建影片路徑
    var videoPath = "./videos/comparison/" + pill + "_" + method + "_vs_ours_" + mode + ".mp4";
    console.log("Video path:", videoPath);

    // 切換影片
    activeVidID = 1 - activeVidID;
    var video_active = document.getElementById("compVideo" + activeVidID);
    var video_hidden = document.getElementById("compVideo" + (1 - activeVidID));
    
    console.log("Setting video source to:", videoPath);
    video_active.src = videoPath;
    
    // 監聽載入事件
    video_active.addEventListener('loadstart', function() {
        console.log("Video load started");
    });
    
    video_active.addEventListener('loadeddata', function() {
        console.log("Video data loaded");
    });
    
    video_active.addEventListener('error', function(e) {
        console.error("Video load error:", e);
        console.error("Failed to load:", videoPath);
    });
    
    video_active.load();

    if (n_views && viewNum) {
        viewNum.innerHTML = n_views;
    }
}

function updateMethodVisibility(mode) {
    // 由於不需要 mode 切換，這個函數可以簡化
    const methods = ['ipanerfnerfacto', 'ipanerfinstantngp', 'ipasplat', 'naive'];
    const scenes = ['bicycle', 'bonsai', 'counter', 'garden', 'kitchen', 'room', 'stump'];

    const titleElement = document.getElementById('title-text');
    if (titleElement) {
        titleElement.textContent = 'StealthAttack outperforms other methods in illusory object injection attack.';
    }

    const descriptionElement = document.getElementById('description-text');
    if (descriptionElement) {
        descriptionElement.innerHTML = "Baseline method (left) vs our StealthAttack (right).";
    }

    // 確保所有方法和場景都可見
    const methodPills = document.querySelectorAll('.method-pill');
    methodPills.forEach(pill => {
        const methodValue = pill.getAttribute('data-value');
        if (methods.includes(methodValue)) {
            pill.style.display = '';
        } else {
            pill.style.display = 'none';
        }
    });

    const scenePills = document.querySelectorAll('.scene-pill');
    scenePills.forEach(pill => {
        const sceneValue = pill.getAttribute('data-value');
        if (scenes.includes(sceneValue)) {
            pill.style.display = '';
        } else {
            pill.style.display = 'none';
        }
    });
}