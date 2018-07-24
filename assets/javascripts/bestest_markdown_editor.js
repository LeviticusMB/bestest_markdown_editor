var bestest_markdown_editor = {};

bestest_markdown_editor.helper = function(field_id, _locale, helpLink) {
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

    function draw_preformatted() { // Hackelihack
        var saved = editor.options.insertTexts.horizontalRule;

        editor.options.insertTexts.horizontalRule = [ '```\n', '\n```'];
        editor.drawHorizontalRule();
        editor.options.insertTexts.horizontalRule = saved;
    }

    var element  = document.getElementById(field_id);
    var timer    = undefined;
    var last_pre = 0;
    var hidden   = true;
    var lang     = bestest_markdown_editor.lang;
    var editor   = bestest_markdown_editor[field_id] = new EasyMDE({
            element:        element,
            autofocus:      false,
            indentWithTabs: false,
            tabSize:        4,
            spellChecker:   false, // locale.replace(/-.*/, '') === 'en',
            previewRender:  render_preview,
            insertTexts: {
                image: ["![](", ")"],
                link: ["[[", "]]"],
            },
            toolbar: [
                { name: "bold",           action: EasyMDE.toggleBold,          className: "fa fa-bold",                            title: lang.strong },
                { name: "italic",         action: EasyMDE.toggleItalic,        className: "fa fa-italic",                          title: lang.italic },
                { name: "strikethrough",  action: EasyMDE.toggleStrikethrough, className: "fa fa-strikethrough",                   title: lang.deleted },
                { name: "code",           action: EasyMDE.toggleCodeBlock,     className: "fa fa-code",                            title: lang.code },
                "|",
                { name: "heading-1",      action: EasyMDE.toggleHeading1,      className: "fa fa-header fa-header-x fa-header-1",  title: lang.heading_1 },
                { name: "heading-2",      action: EasyMDE.toggleHeading2,      className: "fa fa-header fa-header-x fa-header-2",  title: lang.heading_2 },
                { name: "heading-3",      action: EasyMDE.toggleHeading3,      className: "fa fa-header fa-header-x fa-header-3",  title: lang.heading_3 },
                "|",
                { name: "unordered-list", action: EasyMDE.toggleUnorderedList, className: "fa fa-list-ul",                         title: lang.unordered_list },
                { name: "ordered-list",   action: EasyMDE.toggleOrderedList,   className: "fa fa-list-ol",                         title: lang.ordered_list },
                { name: "quote",          action: EasyMDE.toggleBlockquote,    className: "fa fa-quote-left",                      title: lang.quote },
                { name: "custom",         action: draw_preformatted,           className: "fa fa-file-code-o",                     title: lang.preformatted_text },
                "|",
                { name: "link",           action: EasyMDE.drawLink,            className: "fa fa-link",                            title: lang.wiki_link },
                { name: "image",          action: EasyMDE.drawImage,           className: "fa fa-picture-o",                       title: lang.image },
                { name: "table",          action: EasyMDE.drawTable,           className: "fa fa-table",                           title: lang.table },
                "|",
// Buggy :(     { name: "preview",        action: EasyMDE.togglePreview,       className: "fa fa-eye no-disable",                  title: lang.preview },
                { name: "side-by-side",   action: EasyMDE.toggleSideBySide,    className: "fa fa-columns no-disable no-mobile",    title: lang.side_preview },
                { name: "fullscreen",     action: EasyMDE.toggleFullScreen,    className: "fa fa-arrows-alt no-disable no-mobile", title: lang.fullscreen },
                "|",
                { name: "guide",          action: helpLink,                    className: "fa fa-question-circle",                 title: lang.help },
            ]
        });

    editor.codemirror.on('blur', function() { editor.codemirror.save(); });

    setInterval(function() {
	    var h = editor.codemirror.getWrapperElement().offsetHeight === 0 && editor.codemirror.getWrapperElement().offsetWidth === 0;

	    if (hidden !== h) {
		if (hidden && !h) {
		    editor.value(element.value);
		    editor.codemirror.focus();
		}

		hidden = h;
	    }
	}, 300);
}

var bestest_markdown_editor_preview = {};
