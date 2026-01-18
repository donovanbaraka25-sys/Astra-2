async function loadModule(name) {
    const stage = document.getElementById('main-stage');

    // 1. Start the Fade Out
    stage.classList.add('fade-out');

    // Wait 200ms for the fade-out to finish
    await new Promise(resolve => setTimeout(resolve, 200));

    try {
        const res = await fetch(`sections/${name}/${name}.html`);
        if (!res.ok) throw new Error("File not found");
        const html = await res.text();

        // 2. Switch the content
        stage.innerHTML = html;

        // 3. Update CSS/JS (Same as before)
        updateModuleAssets(name);

        // 4. Remove Fade Out and add Fade In
        stage.classList.remove('fade-out');
        stage.classList.add('fade-in');

        // Cleanup the animation class after it finishes
        setTimeout(() => stage.classList.remove('fade-in'), 500);

    } catch (err) {
        stage.innerHTML = `<h2 style="padding:20px;">Module ${name} is coming soon!</h2>`;
        stage.classList.remove('fade-out');
    }
}

// Helper to keep the dispatcher clean
function updateModuleAssets(name) {
    // CSS
    const oldLink = document.getElementById('module-style');
    if (oldLink) oldLink.remove();
    const link = document.createElement('link');
    link.id = 'module-style';
    link.rel = 'stylesheet';
    link.href = `sections/${name}/${name}.css`;
    document.head.appendChild(link);

    // JS
    const oldScript = document.getElementById('module-script');
    if (oldScript) oldScript.remove();
    const script = document.createElement('script');
    script.id = 'module-script';
    script.src = `sections/${name}/${name}.js?v=${new Date().getTime()}`;
    document.body.appendChild(script);
}
async function loadTool(toolName) {
    // 1. USE THE CORRECT ID (matching your loadModule function)
    const stage = document.getElementById('main-stage'); 
    
    if (!stage) {
        console.error("Lab Error: 'main-stage' element not found in index.html");
        return;
    }

    // 2. The Path (Corrected for your folder structure)
    const basePath = `sections/tools/sub-tools/${toolName}/${toolName}`;
    
    try {
        const response = await fetch(`${basePath}.html`);
        if (!response.ok) throw new Error('Tool not found');
        const html = await response.text();
        
        // Use 'stage' here instead of 'contentDiv'
        stage.innerHTML = html;

        // 3. Update Assets (Styles/Scripts)
        updateToolAssets(toolName, basePath);

    } catch (error) {
        console.error("Lab Error:", error);
        stage.innerHTML = `<h3 style="color:red">Error: ${toolName} not found</h3>`;
    }
}

// Simplified Helper for Sub-Tools
function updateToolAssets(name, path) {
    const styleId = `style-${name}`;
    if (!document.getElementById(styleId)) {
        const link = document.createElement('link');
        link.id = styleId;
        link.rel = 'stylesheet';
        link.href = `${path}.css`;
        document.head.appendChild(link);
    }

    const scriptId = `script-${name}`;
    if (document.getElementById(scriptId)) document.getElementById(scriptId).remove();
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `${path}.js?v=${new Date().getTime()}`;
    document.body.appendChild(script);
}
