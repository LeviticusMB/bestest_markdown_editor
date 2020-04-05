require_dependency 'redmine/wiki_formatting/markdown/helper.rb'

module BestestMarkdownEditor
    module Patches
        module MarkdownHelperPatch
            def self.included(base) # :nodoc:
                base.send(:include, InstanceMethods)
                base.class_eval do
                    unloadable
                    alias_method :wikitoolbar_for, :wikitoolbar_for_with_bestest_markdown_editor

                    alias_method :heads_for_wiki_formatter, :heads_for_wiki_formatter_with_bestest_markdown_editor
                end
            end

            module InstanceMethods
                def wikitoolbar_for_with_bestest_markdown_editor(field_id)
                    heads_for_wiki_formatter
                    url = "#{Redmine::Utils.relative_url_root}/help/#{current_language.to_s.downcase}/wiki_syntax_markdown.html"
                    javascript_tag("bestest_markdown_editor.helper('#{field_id}', '#{current_language.to_s}', '#{escape_javascript url}');")
                end

                def heads_for_wiki_formatter_with_bestest_markdown_editor
                    unless @heads_for_wiki_formatter_included
                        content_for :header_tags do
                            javascript_tag("var wikiImageMimeTypes = #{Redmine::MimeType.by_type('image').to_json};") +
                            javascript_include_tag('easymde.js', plugin: 'bestest_markdown_editor') +
                            javascript_include_tag('bestest_markdown_editor.js', plugin: 'bestest_markdown_editor') +
                            javascript_tag("bestest_markdown_editor.lang = #{t(:bestest_markdown_editor).to_json.html_safe}") +
                            stylesheet_link_tag('easymde.css', plugin: 'bestest_markdown_editor') +
                            stylesheet_link_tag('bestest_markdown_editor.css', plugin: 'bestest_markdown_editor')
                        end
                        @heads_for_wiki_formatter_included = true
                    end
                end
            end
        end
    end
end

unless Redmine::WikiFormatting::Markdown::Helper.included_modules.include? BestestMarkdownEditor::Patches::MarkdownHelperPatch
    Redmine::WikiFormatting::Markdown::Helper.send(:include, BestestMarkdownEditor::Patches::MarkdownHelperPatch)
end