function annotatePinyin() {
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    const chineseRegex = /[\u4e00-\u9fff]/;
  
    while (walk.nextNode()) {
      const node = walk.currentNode;
      if (chineseRegex.test(node.nodeValue)) {
        const parent = node.parentNode;
        if (!parent) continue;
        const frag = document.createDocumentFragment();
  
        for (const char of node.nodeValue) {
          if (chineseRegex.test(char)) {
            const ruby = document.createElement("ruby");
            ruby.textContent = char;
            const rt = document.createElement("rt");
            const py = window.pinyin(char, { style: window.pinyin.STYLE_TONE2 });
            rt.textContent = py && py[0] ? py[0][0] : '';
            ruby.appendChild(rt);
            frag.appendChild(ruby);
          } else {
            frag.appendChild(document.createTextNode(char));
          }
        }
  
        parent.replaceChild(frag, node);
      }
    }
  }
  
  annotatePinyin();
  