"""
Script to rebuild HTML files with external CSS/JS
"""

def rebuild_about_html():
    # Read backup
    with open('c:/Users/user/Desktop/tmkdo/about.html.backup', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract body content
    body_start = content.find('<body>')
    script_start = content.rfind('<script>')
    body_content = content[body_start:script_start]
    
    # New head
    new_head = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us - The Minimalist Kraft & DO</title>
    
    <!-- External Stylesheets -->
    <link rel="stylesheet" href="assets/css/theme.css">
    <link rel="stylesheet" href="assets/css/components.css">
    <link rel="stylesheet" href="assets/css/about.css">
    
    <!-- GSAP for Animations -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
</head>
"""
    
    # New script
    new_script = """
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
</html>"""
    
    # Update logo in body content
    body_content = body_content.replace(
        '<a href="index.html" class="logo">The Minimalist <span>Kraft & DO</span></a>',
        '<a href="index.html" class="logo"><span class="logo-icon">🏠</span> <span>The Minimalist Kraft & DO</span></a>'
    )
    
    # Write new file
    with open('c:/Users/user/Desktop/tmkdo/about.html', 'w', encoding='utf-8') as f:
        f.write(new_head + body_content + new_script)
    
    print('✅ about.html updated successfully')

def rebuild_contact_html():
    # Read backup
    with open('c:/Users/user/Desktop/tmkdo/contact.html.backup', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract body content
    body_start = content.find('<body>')
    script_start = content.rfind('<script>')
    body_content = content[body_start:script_start]
    
    # New head
    new_head = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - The Minimalist Kraft & DO</title>
    
    <!-- External Stylesheets -->
    <link rel="stylesheet" href="assets/css/theme.css">
    <link rel="stylesheet" href="assets/css/components.css">
    <link rel="stylesheet" href="assets/css/contact.css">
    
    <!-- GSAP for Animations -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
</head>
"""
    
    # New script
    new_script = """
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
</html>"""
    
    # Update logo in body content
    body_content = body_content.replace(
        '<a href="index.html" class="logo">The Minimalist <span>Kraft & DO</span></a>',
        '<a href="index.html" class="logo"><span class="logo-icon">🏠</span> <span>The Minimalist Kraft & DO</span></a>'
    )
    
    # Write new file
    with open('c:/Users/user/Desktop/tmkdo/contact.html', 'w', encoding='utf-8') as f:
        f.write(new_head + body_content + new_script)
    
    print('✅ contact.html updated successfully')

def rebuild_index_html():
    # Read backup
    with open('c:/Users/user/Desktop/tmkdo/index.html.backup', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract body content
    body_start = content.find('<body>')
    script_start = content.rfind('<script>')
    body_content = content[body_start:script_start]
    
    # New head
    new_head = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Minimalist Kraft & DO - Home Decor Blog</title>
    
    <!-- External Stylesheets -->
    <link rel="stylesheet" href="assets/css/theme.css">
    <link rel="stylesheet" href="assets/css/components.css">
    <link rel="stylesheet" href="assets/css/index.css">
    
    <!-- GSAP for Animations -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
</head>
"""
    
    # New script
    new_script = """
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
</html>"""
    
    # Update logo in body content
    body_content = body_content.replace(
        '<a href="index.html" class="logo">The Minimalist <span>Kraft & DO</span></a>',
        '<a href="index.html" class="logo"><span class="logo-icon">🏠</span> <span>The Minimalist Kraft & DO</span></a>'
    )
    
    # Write new file
    with open('c:/Users/user/Desktop/tmkdo/index.html', 'w', encoding='utf-8') as f:
        f.write(new_head + body_content + new_script)
    
    print('✅ index.html updated successfully')

if __name__ == '__main__':
    rebuild_about_html()
    rebuild_contact_html()
    rebuild_index_html()
    print('\n🎉 All files rebuilt successfully!')
