require_dependency 'bestest_markdown_editor/patches/application_helper_patch'
require_dependency 'bestest_markdown_editor/patches/markdown_helper_patch'

Redmine::Plugin.register :bestest_markdown_editor do
  name 'Bestest Markdown Editor'
  author 'Martin Blom'
  description "This is an awesome Markdown editor for Redmine. It's great. It's the bestest."
  version '1.0.1'
  url 'https://github.com/LeviticusMB/bestest_markdown_editor'
  author_url 'https://github.com/LeviticusMB'
end
