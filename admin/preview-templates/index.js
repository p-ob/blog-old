import Post from "/admin/preview-templates/post.js";
import Project from "/admin/preview-templates/project.js";
import Talk from "/admin/preview-templates/talk.js";
import Page from "/admin/preview-templates/page.js";

// Register the Post component as the preview for entries in the blog collection
CMS.registerPreviewTemplate("blog", Post);
CMS.registerPreviewTemplate("talks", Talk);
CMS.registerPreviewTemplate("projects", Project);
CMS.registerPreviewTemplate("pages", Page);

CMS.registerPreviewStyle("/_includes/assets/css/inline.css");
// Register any CSS file on the home page as a preview style
fetch("/")
  .then(response => response.text())
  .then(html => {
    const f = document.createElement("html");
    f.innerHTML = html;
    Array.from(f.getElementsByTagName("link")).forEach(tag => {
      if (tag.rel == "stylesheet" && !tag.media) {
        CMS.registerPreviewStyle(tag.href);
      }
    });
  });
