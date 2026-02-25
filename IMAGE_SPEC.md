# Little Leaps — Image Spec Sheet

All images go inside the `public/` folder of the project.
After adding any images, tell Claude to hook up the code.

---

## What Already Exists (do not touch)

| File | Location |
|---|---|
| logo-mark.svg | public/images/ |
| hero-illustration.svg | public/images/ |
| quiz-illustration.svg | public/images/ |
| award-placeholder.svg | public/images/ |
| blog-placeholder.svg | public/images/ |

---

## FOLDER 1 — public/images/blogs/

6 images. Shown as large card thumbnails on the Blogs page.
Format: JPG — 1200 x 675px (16:9 ratio)
Style: Warm lifestyle photography, soft natural light, pastel tones (blush/lavender/mint)

| Filename | What to show |
|---|---|
| milestones-0-6.png | Newborn on a white muslin blanket, peaceful, natural window light. Soft and serene. |
| tummy-time.png | Baby (2–4 months) lifting their head during tummy time on a colourful mat, curious expression, parent's hands just visible at the edge for safety. |
| language-development.png | Parent and baby face-to-face, parent talking expressively, baby's mouth slightly open as if responding. Warm home setting — sofa or cozy chair. Joyful eye contact. |
| celebrate-milestones.png | Baby clapping or laughing with a big open-mouth smile, or parent holding a small framed certificate up next to the baby. Celebratory, golden light. |
| fine-motor-activities.png | Close-up on baby hands (6–12 months) grasping a stacking ring or wooden block. Sharp focus on hands and toy, soft blurred background. Pastel-coloured toys. |
| developmental-delays.png | Parent holding baby close in a warm hug — both calm and reassured. Non-alarming. This topic needs to feel safe and supportive, not clinical. |

---

## FOLDER 2 — public/images/authors/

4 images. Shown as small circular avatars on blog cards.
Format: JPG — 400 x 400px (square, will be cropped to a circle)
Style: Professional but warm headshots. Solid or softly blurred background.
Tip: AI-generated portraits (e.g. thispersondoesnotexist.com) or diverse stock photos work well here.

| Filename | Person and role |
|---|---|
| sarah-mitchell.png | Dr. Sarah Mitchell — Paediatric Specialist. Professional woman, warm smile, soft neutral or clinic background. |
| emma-clarke.png | Emma Clarke — Paediatric Physiotherapist. Friendly, casual-professional look, warm background. |
| james-okafor.png | Dr. James Okafor — Speech & Language Therapist. Professional man, approachable smile, neutral background. |
| lily-nguyen.png | Lily Nguyen — Child Psychologist. Warm and welcoming expression, soft background. |

---

## FOLDER 3 — public/images/products/

12 images. Shown as product photos on the Awards page (Gold and Silver winners).
Format: PNG — 800 x 600px, white or transparent background
Source: Brand press kits, official brand websites, or retailer product photography

| Filename | Product |
|---|---|
| pampers-pure-protection.png | Pampers Pure Protection diaper — pack shot |
| huggies-natural-care.png | Huggies Natural Care diaper — pack shot |
| aveeno-baby-daily-moisture.png | Aveeno Baby Daily Moisture Lotion — bottle shot |
| cerave-baby-moisturising.png | CeraVe Baby Moisturising Lotion — bottle shot |
| uppababy-vista-v3.png | UPPAbaby Vista V3 pram — full side profile |
| bugaboo-fox-5.png | Bugaboo Fox 5 pushchair — full side profile |
| mam-easy-start-bottle.png | MAM Easy Start Anti-Colic Bottle |
| philips-avent-natural-response.png | Philips Avent Natural Response bottle |
| nanit-pro-monitor.png | Nanit Pro Smart Baby Monitor — overhead camera unit |
| motorola-halo-plus.png | Motorola Halo+ — over-crib monitor unit |
| skip-hop-activity-gym.png | Skip Hop Explore & More Activity Gym — laid flat, shot from overhead |
| fisher-price-linkimals-sloth.png | Fisher-Price Smooth Moves Sloth — plush toy product shot |

---

## FOLDER 4 — public/images/team/

3 images. Shown on the About page team section (currently showing coloured initials).
Format: JPG — 400 x 400px (square)
Style: Same as author avatars — warm, professional headshots

| Filename | Person and role |
|---|---|
| sarah-mitchell.png | Dr. Sarah Mitchell — Paediatric Advisor |
| emma-clarke.png | Emma Clarke — Head of Content |
| james-okafor.png | James Okafor — Design Lead |

Note: After adding these, tell Claude to update the About page code to display photos instead of initials.

---

## BONUS — public/images/

One extra image worth doing for social sharing:

| Filename | Spec | What to show |
|---|---|---|
| og-image.png | 1200 x 630px JPG | Little Leaps logo + tagline on a blush-to-lavender gradient background with a baby milestone illustration. Appears when anyone shares the site on WhatsApp, Twitter, iMessage, LinkedIn. |

---

## Images to IGNORE

The following 8 images are referenced in data/awards.json but are NO LONGER used
anywhere on the live site (the old e-commerce awards page was replaced). Do not bother sourcing these.

- /images/awards/first-smile.png
- /images/awards/tummy-time.png
- /images/awards/first-roll.png
- /images/awards/first-word.png
- /images/awards/standing-star.png
- /images/awards/first-steps.png
- /images/awards/peek-a-boo.png
- /images/awards/self-feeding.png

---

## Summary

| Folder | Count | Priority |
|---|---|---|
| public/images/blogs/ | 6 images | High — biggest visible impact |
| public/images/authors/ | 4 images | High — credibility on blog cards |
| public/images/products/ | 12 images | High — awards page looks bare without these |
| public/images/team/ | 3 images | Medium — about page trust signal |
| public/images/ (og-image) | 1 image | Medium — social sharing |

Total: 26 images across 4 folders + 1 bonus

---

## After Adding Images

Tell Claude which folders you have filled and the following code changes will be made automatically:

- products/ added     → productAwards.json image paths updated to real files
- team/ added         → About page code updated to show photos instead of initials
- og-image.png added  → app/layout.tsx updated with Open Graph meta tag
