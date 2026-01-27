"""
Script to update HTML files with new theme system
"""
import re

def process_html_file(filepath, output_path):
    """Remove inline styles and update with external references"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the head section
    head_start = content.find('<head>')
    head_end = content.find('</head>')
    style_start = content.find('<style>', head_start)
    style_end = content.find('</style>', head_start) + len('</style>')
    
    # Extract body content
    body_start = content.find('<body>')
    body_end = content.find('</body>') + len('</body>')
    script_start = content.rfind('<script>', body_start, body_end)
    
    # Build new head
    new_head = '''<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    
    <!-- External Stylesheets -->
    <link rel="stylesheet" href="assets/css/theme.css">
    <link rel="stylesheet" href="assets/css/components.css">
    <link rel="stylesheet" href="assets/css/{page_css}.css">
    
    <!-- GSAP for Animations -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
</head>'''
    
    # Get title
    title_match = re.search(r'<title>(.*?)</title>', content)
    title = title_match.group(1) if title_match else "The Minimalist Kraft & DO"
    
    # Determine page type
    if 'about' in filepath.lower():
        page_css = 'about'
    elif 'contact' in filepath.lower():
        page_css = 'contact'
    else:
        page_css = 'index'
    
    new_head = new_head.format(title=title, page_css=page_css)
    
    # Extract body content (without scripts)
    if script_start > body_start:
        body_content = content[body_start:script_start]
    else:
        body_content = content[body_start:body_end]
    
    # New ending script
    new_script = '''
    <!-- External JavaScript with GSAP animations -->
    <script src="assets/js/theme-animations.js"></script>
    
    <script>
        // Mobile menu toggle  
        function toggleMobileMenu() {
            const navLinks = document.getElementById('navLinks');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            navLinks?.classList.toggle('active');
            mobileToggle?.classList.toggle('active');
        }

        function closeMobileMenu() {
            const navLinks = document.getElementById('navLinks');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            navLinks?.classList.remove('active');
            mobileToggle?.classList.remove('active');
        }

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const nav = document.querySelector('nav');
            const navLinks = document.getElementById('navLinks');
            
            if (nav && navLinks && !nav.contains(event.target) && navLinks.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    </script>
</body>
</html>'''
    
    # Rebuild HTML
    new_html = f'''<!DOCTYPE html>
<html lang="en">
{new_head}
{body_content}{new_script}'''
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    print(f"Processed: {filepath} -> {output_path}")

# Process files
process_html_file('c:/Users/user/Desktop/tmkdo/about.html.backup', 'c:/Users/user/Desktop/tmkdo/about_new.html')
process_html_file('c:/Users/user/Desktop/tmkdo/contact.html.backup', 'c:/Users/user/Desktop/tmkdo/contact_new.html')
