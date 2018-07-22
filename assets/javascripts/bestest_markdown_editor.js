function bestest_markdown_editor(field_id, _locale, helpLink) {
    function render_preview(plainText, preview) {
        if (!(element.name === 'issue[description]' && element.form.elements['issue[notes]']) &&
            typeof bestest_markdown_editor_preview[element.form.id] === 'function') {
            editor.codemirror.save();
            clearTimeout(timer);
            timer = setTimeout(function() {
                last_pre = Date.now();
                bestest_markdown_editor_preview[element.form.id](plainText, preview);
            }, Math.max(1000 - (Date.now() - last_pre), 0));
            return preview.innerHTML;
        }
        else {
            return this.parent.markdown(plainText);
        }
    }

    var element  = document.getElementById(field_id),
        timer    = undefined,
        last_pre = 0;
        editor   = bestest_markdown_editor[field_id] = new EasyMDE({
            element:        element,
            autofocus:      true,
            indentWithTabs: false,
            tabSize:        4,
            spellChecker:   false, // locale.replace(/-.*/, '') === 'en',
            previewRender:  render_preview,
            toolbar: [
                { name: "bold",           action: EasyMDE.toggleBold,          className: "fa fa-bold", title: jsToolBar.strings['Strong'] },
                { name: "italic",         action: EasyMDE.toggleItalic,        className: "fa fa-italic", title: jsToolBar.strings['Strong'] },
                { name: "strikethrough",  action: EasyMDE.toggleStrikethrough, className: "fa fa-strikethrough", title: jsToolBar.strings['Strong'] },
                { name: "code",           action: EasyMDE.toggleCodeBlock,     className: "fa fa-code", title: jsToolBar.strings['Strong'] },
                "|",
                { name: "heading-1",      action: EasyMDE.toggleHeading1,      className: "fa fa-header fa-header-x fa-header-1", title: jsToolBar.strings['Strong'] },
                { name: "heading-2",      action: EasyMDE.toggleHeading2,      className: "fa fa-header fa-header-x fa-header-2", title: jsToolBar.strings['Strong'] },
                { name: "heading-3",      action: EasyMDE.toggleHeading3,      className: "fa fa-header fa-header-x fa-header-3", title: jsToolBar.strings['Strong'] },
                "|",
                { name: "unordered-list", action: EasyMDE.toggleUnorderedList, className: "fa fa-list-ul", title: jsToolBar.strings['Strong'] },
                { name: "ordered-list",   action: EasyMDE.toggleOrderedList,   className: "fa fa-list-ol", title: jsToolBar.strings['Strong'] },
                { name: "quote",          action: EasyMDE.toggleBlockquote,    className: "fa fa-quote-left", title: jsToolBar.strings['Strong'] },
                "|",
                { name: "link",           action: EasyMDE.drawLink,            className: "fa fa-link", title: jsToolBar.strings['Strong'] },
                { name: "image",          action: EasyMDE.drawImage,           className: "fa fa-picture-o", title: jsToolBar.strings['Strong'] },
                { name: "table",          action: EasyMDE.drawTable,           className: "fa fa-table", title: jsToolBar.strings['Strong'] },
                "|",
// Buggy :(     { name: "preview",        action: EasyMDE.togglePreview,       className: "fa fa-eye no-disable", title: jsToolBar.strings['Strong'] },
                { name: "side-by-side",   action: EasyMDE.toggleSideBySide,    className: "fa fa-columns no-disable no-mobile", title: jsToolBar.strings['Strong'] },
                { name: "fullscreen",     action: EasyMDE.toggleFullScreen,    className: "fa fa-arrows-alt no-disable no-mobile", title: jsToolBar.strings['Strong'] },
                "|",
                { name: "guide",          action: helpLink,                    className: "fa fa-question-circle", title: jsToolBar.strings['Strong'] },
            ]
        });

    editor.codemirror.on('blur', function() { editor.codemirror.save(); });
}

var bestest_markdown_editor_preview = {};
