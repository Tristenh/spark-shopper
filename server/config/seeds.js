const db = require("./connection");
const { User, Product, Category, SubCategory } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Category", "categories");
  await cleanDB("SubCategory", "categories");
  await cleanDB("Product", "products");
  await cleanDB("User", "users");

  //seed Categories
  const categories = await Category.insertMany([
    { name: "Computers" },
    { name: "Home Appliances" },
    { name: "Mobile Phones" },
    { name: "Cameras" },
    { name: "Tvs" },
  ]);
  console.log("categories seeded");

  //seed Subcategories
  const subcategories = await SubCategory.insertMany([
    { name: "Laptops", category: categories[0]._id },
    { name: "Desktop Pcs", category: categories[0]._id },
    { name: "iPads, tablets", category: categories[0]._id },
    { name: "Keyboards", category: categories[0]._id },
    { name: "Monitors", category: categories[0]._id },
    { name: "Washers & Dryers", category: categories[1]._id },
    { name: "Fridges & freezers", category: categories[1]._id },
    { name: "Dishwashers", category: categories[1]._id },
    { name: "Vacuuming & Cleaning", category: categories[1]._id },
    { name: "Microwaves", category: categories[1]._id },
    { name: "Apple iPhone", category: categories[2]._id },
    { name: "Samsung Galaxy", category: categories[2]._id },
    { name: "Google Pixel", category: categories[2]._id },
    { name: "Android phones", category: categories[2]._id },
    { name: "5G phones", category: categories[2]._id },
    { name: "Drones", category: categories[3]._id },
    { name: "DSLR Cameras", category: categories[3]._id },
    { name: "Mirrorless Cameras", category: categories[3]._id },
    { name: "Camera lenses", category: categories[3]._id },
    { name: "SD cards", category: categories[3]._id },
  ]);

  console.log("sub categories seeded");

  //seed products
  const products = await Product.insertMany([
    {
      name: "Apple MacBook Air 13-inch with M1 chip, 7-core GPU, 256GB SSD (Space Grey) [2020]",
      description:
        "Apple’s thinnest and lightest notebook gets supercharged with the Apple M1 chip. Tackle your projects with the blazing-fast 8-core CPU. Take graphics-intensive apps and games to the next level with a 7-core GPU. And accelerate machine learning tasks with the 16-core Neural Engine. All with a silent, fanless design and the longest battery life ever — up to 18 hours.1 MacBook Air. Still perfectly portable. Just a lot more powerful.\n\nKey Features\n\nApple-designed M1 chip for a giant leap in CPU, GPU and machine learning performance\n\nGo longer than ever with up to 18 hours of battery life1\n\n8-core CPU delivers up to 3.5x faster performance, to tackle projects faster than ever2\n\nSeven GPU cores for faster graphics, graphics-intensive apps and games2\n\n16-core Neural Engine for advanced machine learning\n\n8GB of unified memory so everything you do is fast and fluid\n\nSuperfast SSD storage launches apps and opens files in an instant\n\nFanless design for silent operation\n\n13.3-inch Retina display with P3 wide colour for vibrant images and incredible detail3\n\nFaceTime HD camera with advanced image signal processor for clearer, sharper video calls\n\nThree-microphone array focuses on your voice instead of what’s going on around you\n\nNext-generation Wi-Fi 6 for faster connectivity\n\nTwo Thunderbolt/USB 4 ports for charging and accessories\n\nBacklit Magic Keyboard and Touch ID for secure unlock and payments\n\nmacOS Big Sur introduces a bold new design and major app updates for Safari, Messages and Maps",
      image: "laptop1.webp",
      price: 1299,
      quantity: 20,
      subcategory: subcategories[0]._id,
    },
    {
      name: "Apple MacBook Air 13-inch with M2 chip, 256GB SSD (Midnight) [2022]",
      description:
        "2022 Apple MacBook Air laptop with M2 chip: 13.6-inch Liquid Retina display, 8GB RAM, 256GB SSD storage, backlit keyboard, 1080p FaceTime HD camera. Works with iPhone and iPad; Midnight.\n\nKey Features\n\nStrikingly Thin Design\nThe redesigned MacBook Air is more portable than ever and weighs just 1.24 kilograms. It’s the incredibly capable laptop that lets you work, play or create just about anything — anywhere.\n\nSupercharged By M2\n Get more done faster with a next-generation 8-core CPU, 8-core GPU and 8GB of unified memory.\n\nUp To 18 Hours of Battery Life\n\nGo all day and into the night, thanks to the power-efficient performance of the Apple M2 chip.1\n\nBig, Beautiful Display\n\nThe 13.6-inch Liquid Retina display features over 500 nits of brightness, P3 wide colour and support for 1 billion colours for vibrant images and incredible detail.2\n\nAdvanced Camera and Audio\n\nLook sharp and sound great with a 1080p FaceTime HD camera, three-mic array and four-speaker sound system with Spatial Audio.\n\nVersatile Connectivity\n\nMacBook Air features a MagSafe charging port, two Thunderbolt ports and a headphone jack.\n\nEasy To Use\n\nYour Mac feels familiar from the moment you turn it on, and works seamlessly with all your Apple devices.\n\nBuilt To Last\n\nThe all-aluminium unibody enclosure is exceptionally durable. And free software updates keep things running smooth and secure for years to come.\n\nSimply Compatible\n\nAll your go-to apps run lightning-fast — including Microsoft 365, Zoom, and many of your favourite iPhone and iPad apps.",
      image: "laptop2.webp",
      price: 1617,
      quantity: 20,
      subcategory: subcategories[0]._id,
    },
    {
      name: "Apple iPhone 15 Pro Max 512GB (Natural Titanium)",
      description:
        "iPhone 15 Pro Max. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customisable Action button and the most powerful iPhone camera system ever.\n\nKey Feature bullets\n\nForged In Titanium\niPhone 15 Pro Max has a strong and light aerospace-grade titanium design with a textured matt glass back. It also features a Ceramic Shield front that’s tougher than any smartphone glass. And it’s splash-, water- and dust-resistant.1\n\nAdvanced Display\nThe 6.7″ Super Retina XDR display2 with ProMotion ramps up refresh rates to 120Hz when you need exceptional graphics performance. Dynamic Island bubbles up alerts and Live Activities. Plus, with Always-On display, your Lock Screen stays glanceable, so you don’t have to tap it to stay in the know.\n\nGame-Changing A17 Pro Chip\n\nA Pro-class GPU makes mobile games feel so immersive, with rich environments and realistic characters. A17 Pro is also incredibly efficient and helps to deliver amazing all-day battery life.3\n\nPowerful Pro Camera System\n\nGet incredible framing flexibility with seven pro lenses. Capture super-high-resolution photos with more colour and detail using the 48MP Main camera. And take sharper close-ups from further away with the 5x Telephoto camera on iPhone 15 Pro Max.\n\nCustomisable Action Button\n\nAction button is a fast track to your favourite feature. Just set the one you want, like Silent mode, Camera, Voice Memo, Shortcut and more. Then press and hold to launch the action.\n\n Pro Connectivity\n\nThe new USB-C connector lets you charge your Mac or iPad with the same cable you use to charge iPhone 15 Pro Max. With USB 3, you get a huge leap in data transfer speeds.4 And you can download files up to 2x faster using Wi-Fi 6E.5\n\nVital Safety Features\n\nIf you need emergency services and you don’t have mobile network connection or Wi-Fi, you can use Emergency SOS via satellite.6 With Crash Detection, iPhone can detect a severe car crash and call for help if you can’t.7\n\nDesigned To Make a Difference\n\niPhone comes with privacy protections that help keep you in control of your data. It’s made from more recycled materials to minimise environmental impact. And it has built-in features that make iPhone more accessible to all.",
      image: "mob1.webp",
      price: 1299,
      quantity: 15,
      subcategory: subcategories[10]._id,
    },
    {
      name: "Samsung Galaxy Z Fold5 5G 512GB (Phantom Black)",
      description:
        "Galaxy Z Fold5 is Samsung's lightest Fold yet1. Unfold your screen for an immersive 7.6 inch display that fits in the palm of your hands. From watching your favourite TV shows on-the-go or smooth gaming and scrolling with the super-fast display, experience your entertainment on a new level. Take brilliant pictures night and day with a powerful camera, and the epic 30 x Space Zoom means you can even capture the moon. Master the art of multitasking by taking video calls and jotting notes with the S-pen2, no matter where you are. All these features are wrapped up in super-strong glass with an IPX8 water resistant rating3 for that added peace of mind. Unfold a whole new world of possibilities.\n\nEnjoy your entertainment on a big-screen, anywhere.\n\nLook forward to your morning work commute. Unfold the Galaxy Z Fold5’s huge 7.6 inch inner display and immerse yourself in your favourite show. Plus, enjoy smooth scrolling and gaming with the ultra-fast refresh rate and improved cooling capabilities on both the cover and main screen. It’s the phone that can always keep up with you.\n\nDo-more, effortlessly\n\nGetting through your to-do list is easy with Galaxy Z Fold5’s tablet-like sized screen. Work with multiple windows open at once1, take a video call whilst comparing documents side-by-side or watch a presentation and take notes seamlessly with the S-pen.2 Do-more effortlessly.\n\nHands-free with flex mode\n\nA big screen that stands on its own. Flex Mode lets you adjust the Galaxy Z Fold5 to your desired angle. Simply fold it to activate Flex Mode on your main screen so you can make hands-free video-calls, set up your phone like a tripod for the perfect family photo, or kick back and watch a movie wherever you are.4\n\nBuilt tough to withstand life’s little accidents.\n\nThe Galaxy ZFold5 may be lightweight but it’s wrapped in extra-strong glass3 designed to withstand life’s ups and downs. A sleek Armour Aluminium frame and hinge cover is designed to protect your device’s interior without bulking it out. The extended immersion IPX8 rated water resistant protection gives you peace of mind around splashes.3\n\nA new spin on slim\n\nWith a re-engineered slim zero gap hinge, the Galaxy Z Fold5 is our lightest Fold yet.1 It puts a powerful hinge, foldable screen, S Pen stylus compatibility2 and a wide cover screen all in the palm of your hand.\n\nS Pen compatible - The smartest S pen pro of them all\n\nSave paper and take notes on your Galaxy Z Fold5 with the S Pen.2 Its natural precision lets you write notes almost like pen to paper. No need to stress about your handwriting. Convert your handwritten meeting notes to text with just a tap and share with your team.\n\nShoot like a pro\n\nA compact camera that packs a serious punch. Your Galaxy Z Fold5 will snap clear, bright photos any time of the day and night with the 50 Mega pixel camera. With 3 x Optical Zoom lens you can take incredible snaps even from a distance.5 Get ready for a camera so good, it can make everyone a pro.\n\nKey Features\n\n7.6\" Main & 6.2\" cover AMOLED display with up to 120Hz adaptive refresh rate\n\nIPX8 water resistant rating3\n\n50MP OIS main camera with 30 x Space Zoom\n\nFlex Mode lets you adjust the Galaxy Z Fold5 to your desired angle\n\nOcta core Snapdragon 8 Gen2 chipset\n\n4,400mAh Typical Battery with 25W Super-Fast Charging and wireless PowerShare\n\nS Pen compatible2\n\nWhat's in the box \n\nHandset \nEjection Pin\nQuick Start Guide\nData Cable (C to C)",

      image: "mob2.webp",
      price: 2799,
      quantity: 10,
      subcategory: subcategories[11]._id,
    },
    {
      name: "Hisense HRCD585BWB 585L French Door Fridge (Black Steel)",
      description:
        "Key Features\n\nDark Interior with antibacterial treatment\n\nConvertible temperature compartment\n\n3 Year Warranty\n\nPlumbed Ice and Water Dispenser\n\n3 Star Energy Rating\n\nPremium black PureFlat design\n\nDark Interior with antibacterial treatment\n\nMetal handle with sleek integrative design\n\nMetal-Tech Cooling\n\nInverter Compressor\n\nFull width shelves with back hanging design\n\nFreezer door baskets\n\nConvertible temperature compartment\n\nFull width Multi Air Flow System\n\nTwin Cooling Technology",

      image: "fridge1.webp",
      price: 2284,
      quantity: 10,
      subcategory: subcategories[6]._id,
    },
    {
      name: "LG GF-MV600 MoodUP 617L French Door LED Colour Panel Fridge",
      description:
        "Key Features\n\nInstaView®\n\nWith two quick knocks on the sleek glass panel, see inside and check for your everyday items, favourite snacks and beverages without opening the door, preventing cold air from escaping and keeping food fresher for longer.\n\nSurroundCooling™\nCold air surrounds your food from both the front and back for effective cooling - quickly reducing the temperature of those items stored at the front of the fridge, and helping keep food fresher for longer.\n\nRetractable Shelf\nTall bottles and jugs? No problem. Simply slide the retractable shelf back to make way to fit it all in.\n\nExtra Space Compartments\nSmart storage drawers built-in Clever storage build into the fridge floor, provides additional space for convenient access to small items such as chocolate, eggs or cheese.\n\nInverter Linear Compressor\nWith low vibration and minimal moving parts the LG Inverter Linear Compressor is quiet and durable. As the heart of your refrigerator we back the Inverter Linear Compressor with a 10 year parts warranty.*\n*2 Years parts and labour on the product + 3 years on sealed refrigeration system (compressor, evaporator, dryer and tubing) parts only + 5 years on compressor (part only).\n\nThinQ App\nControl the light up door panels and set the mood with the LG ThinQ app.\n\nMoodUP Colour Collection\n - My Collection\nSelect the color to each door panel. You can make 174,724 combinations.\n\n- Theme Collection\nSelect the pre-set theme color. There are 17 themes.\n\nAdd Mood with Music\nA speaker built into the top of the fridge allows music to be played. Play pre-installed music or sounds to accompany “Theme” or it could be music from your own Bluetooth connected device.",
      image: "fridge2.webp",
      price: 7999,
      quantity: 20,
      subcategory: subcategories[6]._id,
    },
    {
      name: "DJI Mini 4 Pro Drone (DJI RC 2)",
      description:
        "DJI Mini 4 Pro is DJI's most advanced mini-camera drone to date.[4] It integrates powerful imaging capabilities, omnidirectional obstacle sensing, ActiveTrack 360° with the new Trace Mode, and 20km FHD video transmission, bringing even more things to love for pros and beginners alike. \n\nKey Features \n\nTake it Easy\nTake off whenever the inspiration strikes. Weighing less than 249g, Mini 4 Pro was designed for convenience on the go,[1] and the drone's weight means there's no need for training or registration in a majority of countries and regions.\n\nOut-sized Imaging Performance\nCapture more complex details easily with Mini 4 Pro's camera, powered by a 1/1.3-inch CMOS sensor featuring Dual Native ISO Fusion, f/1.7 aperture, and 2.4μm 4-in-1 pixels.[5]  More highlight and shadow details with a high dynamic range means uncompromising results in every frame.\n\n Maximum Visual Impact\nGive vibrant scenes the details they deserve with 4K/60fps HDR and 4K/100fps video, while 10-bit D-Log M and HLG help capture a stunning range of colors and provide more flexibility while editing and sharing.\n\n4K/60fps HDR\nPreserve the natural wonder of any moment. 4K/60fps HDR lets you share the nuances of sunset or sunrise in true-to-life quality.n\nSlo-Mo 4K/100fps\nImmerse the audience in every frame. With slow motion in 4K clarity, capture the action on the trails, at the beach, or in your own backyard at 100fps.\n\nHighlight the NightT\nhe improved noise reduction algorithm of Mini 4 Pro's Night Shots  video effectively suppresses noise and facilitates clearer, cleaner footage right from the camera.\n\n1.07 Billion Colors\nRecord in 10-bit D-Log M and capture over one billion colors. The natural color gradations and delicate full-spectrum details mean Mini 4 Pro unlocks pro-level post-production control and expert-level creative editing flexibility.\n\nDynamic on Every Platform\nNo matter where you publish your content, HLG ensures the natural colors and brightness remain true-to-life without adjustment or format conversion due to its high dynamic range.\n\nRAW-Some Photos\nIt's often the little things that matter most. Preserve every intricate detail with 48MP RAW and next-gen SmartPhoto[6] which combines HDR imaging, scene recognition, and more  for images that pop.\n\nSense More, Fly Safe\nOmnidirectional obstacle sensing makes Mini 4 Pro mighty safe. With four wide-angle vision sensors and a pair of downward vision sensors, it detects obstacles from all angles. Advanced Pilot Assistance Systems (APAS) ensures additional safety by enabling automatic braking and bypassing during flight.\n\nFly Longer, Create More\nLeave battery concerns behind and stay focused on creation with Mini 4 Pro's Intelligent Flight Battery. Enjoy up to 34 minutes of flight time.\n\n20 km Video Transmission\n Mini 4 Pro features DJI's O4 video transmission. Enjoy ultra-responsive control and smooth 1080p/60fps FHD live feeds from distances of up to 20 km.[3]\n\nA Touch of Cinematics\n Mini 4 Pro has three effortless ways to get the shots you want: Spotlight, Point of Interest, and the revolutionary new ActiveTrack 360° with enhanced subject tracking capabilities. Swipe a path on the trace wheel interface to capture seamless cinematic shots. With omnidirectional obstacle sensing, bypassing obstacles and achieving smoother, more stable tracking for pro-level results is shockingly simple.\n\nDJI RC 2\nThis lightweight and easy-to-use remote controller comes with the built-in DJI Fly app, eliminating the need for smartphone use during flight. The high-definition screen delivers a crisp and clear view even under direct sunlight, optimizing your entire Mini 4 Pro experience.\n\n What’s in the box? \n\n1 x DJI Mini 4 Pro\n1 x DJI RC 2 Controller\n 1 x DJI Mini 4 Pro Intelligent Flight Battery\n1 x DJI Mini 4 Pro/Mini 3 Pro Propellers (Pair) (Screws Included)\n 1 x Screwdriver\n 1 x DJI Mini 4 Pro Gimbal Protector\n 1 x DJI Mini 4 Pro Propeller Holder\n 1 x Documents (Quick Start Guide and Safety Guidelines)\n1 x Type-C to Type-C PD Cable \n 1 x USB-C Cable",
      image: "drone.webp",
      price: 1419,
      quantity: 10,
      subcategory: subcategories[15]._id,
    },
    {
      name: "Panasonic LUMIX S5II Full-Frame Mirrorless Camera with 20-60mm Lens [6K Video]",
      description:
        "Focus On What Matters\n\nThe new Phase Hybrid Autofocus is fast, accurate and continuously tracks the subject, meeting the demands of modern content creators. The LUMIX S5II has you covered even in the most challenging situations.\n\n Same Shot. Different Crop.\nModern filmmakers, content creators and vloggers will love the full sensor 6K (3:2) recording in the new S5II. Giving you more room to crop from a single shot while maintaining 4K resolution even with vertical cuts. With endless aspect ratios and guides to help you frame your shot, this is a workflow game changer.\n\nA Look to Suit Your Style\nLove a preset? Now LUMIX S5II gives you the ability to add your favourite LUTs directly into the camera. Get a stylised look instantly without the need to edit your photos and videos.\n\n Long Takes. No Breaks.\nEnjoy unlimited recording time with our new Active Cooling Technology, perfect for hot Aussie summers. The S5II retains its compact size while increasing reliability and performance.\n\nKey Features\n\n24.2MP CMOS Sensor - Superior high-sensitivity performance and excellent dynamic range\n\nPhase Hybrid Auto Focus – Fast & Accurate Autofocus System\n\n  Active I.S. Technology - Get incredible, stable footage, even when on the move\n\n Image Engine with L² Technology - Approx. 2x higher-speed signal processing\n\nREAL TIME LUT - load-in your favourite look and capture it in camera\n\nLUMIX S 20-60mm F3.5-5.6 Lens included",
      image: "camera1.webp",
      price: 2898,
      quantity: 20,
      subcategory: subcategories[17]._id,
    },
    {
      name: "Nokia G42 5G 128GB (Pink)",
      description:
        "Snap, share, shop, stream – do it all at your pace with 5G² connectivity. Take stunningly clear shots with AI-powered imaging and get them on your socials fast. Go for days without charging and for years without worry – the 3-day battery³ will take you through the weekend, while QuickFix repairability means you can make repairs at home and keep your phone for longer.\n\nKey Features\n\n5G connectivity² \nFast network speeds, powered by the Snapdragon® 480+ 5G chipset.\n\n screen, big audio \n6.56” HD+ display and OZO Playback for immersive videos and music.\n\n Stunning photos\nUsing AI algorithms, the 50 MP camera takes shareable shots, day or night.\n\n Up to 3-day battery life³\nForgot the charger? Nokia G42 5G will see you through the weekend.\n\nSo secure\n With Android™ 13, you have more control over what information apps can and can’t access including specific photos, videos and clipboard history. With up to 3 years of monthly security updates,¹ you won’t be worrying about ‘outdated protection’ any time soon.",
      image: "mob3.webp",
      price: 449,
      quantity: 10,
      subcategory: subcategories[13]._id,
    },
    {
      name: "Google Pixel 8 5G 128GB (Rose)",
      description:
        "Meet Pixel 8. The helpful phone engineered by Google, with an amazing camera, powerful security and an all-day battery.1 With Google AI, you can do more, even faster – like fix photos, screen calls and get answers.2 And Pixel 8 has personal safety features for added peace of mind.3\n\n Key Features\n\n The power behind Google AI on Pixel. \n  Google Tensor G3 is Pixel’s most powerful chip yet. It’s custom-designed with Google AI for cutting-edge photo and video features and smart ways to help throughout the day. And it makes Pixel 8 super fast and efficient.\n\nA stunning display.\n Pixel's 6.2-inch high-resolution display delivers sharp, vivid colours and rich detail.4 And it has a refresh rate up to 120Hz for smoother gaming, scrolling and switching between apps.5\n\n Pixel's brightest display yet.\n  Pixel 8 outshines other Pixel displays for higher peak brightness.6 So you can see your screen clearly, even in direct sunlight.\n\n The super dependable all-day battery. \nPixel's Adaptive Battery can last over 24 hours.7 Turn on Extreme Battery Saver, and it can last up to 72 hours for power when you need it most.7 And your Pixel can charge faster than ever.8\n\n Fresh, modern design.\nPixel 8 raises the bar for beautiful design with contoured edges, a satin finish and stylish colours. And it's made with approximately 18% recycled materials (based on weight).9\n\nScratches and spills are no big deal.\n With its durable design and IP68 protection, Pixel 8 can handle some slips, spills and dust.10 And it's scratch-resistant, with Corning® Gorilla® Glass Victus.®\n\n Amazing photos and videos, every time.\nThe Pixel Camera is fully upgraded and has advanced image processing to reveal vivid colours and striking details in any light. And now with Macro Focus, the smallest subjects can become spectacular images.\n\n Incredible videos, on every take.\n The Pixel Camera is equipped to record smooth videos with stunning resolution and clear audio, even in crowded, dimly lit places. And you can add cinematic effects with a few taps.11\n\n Your social media, stepped up.\n Pixel's high-quality photos, videos and audio are now integrated into selected social apps. So you can create content with beautiful images and clear sound effortlessly.\n\nMake distractions disappear, just like that.\n Easily remove distractions, like photobombers, with Magic Eraser, using Google’s AI technology in Google Photos. Or change the colour and brightness so that an object blends right in.11\n\n Get things done with Google Assistant.\nJust say 'Hey Google' to stay in touch, manage tasks, get answers and more. Write messages twice as fast with your voice.12 And get helpful info at the right time.\n\nTranslate languages in real time.\n With Live Translate, Pixel can interpret your face-to-face conversations in 49 languages, transcribe messages back and forth as you chat and translate menus with the camera.13\n\nSecurity you can depend on.\n With Google Tensor G3 and the Titan M2 security chip, Pixel is built with multiple layers of security to help keep your personal info safe.\n\n Security updates help keep Pixel safe.\nTo protect you and your sensitive data, Pixel comes with 7 years of security updates from launch.14 So your Pixel gets even more secure over time.",
      image: "mob4.webp",
      price: 1199,
      quantity: 15,
      subcategory: subcategories[12]._id,
    },
    {
      name: "Samsung Galaxy S22 Ultra 5G 256GB (Green)",
      description:
        'Galaxy S22 Ultra\n\nWe are breaking the rules of innovation with the Galaxy S22 Ultra. Setting the standard at being our most epic smartphone. We know you want the best and that is why we are breaking all the rules. With all day battery life, our most advanced pro-grade camera, our brightest display and a Galaxy first with a built in S-Pen, Ultra easily lives up to its name.\n\n Pro-grade Camera\n\nOur most advanced Pro-grade camera yet. Shoot in 108MP - the highest resolution on a smartphone in Australia. Use three lenses including ultra-wide to take photos which are clear and bright thanks to laser autofocus and Night Mode. Now all cameras- front and back – support Portrait Mode at night. Get ready for a camera so good, it can make everyone a pro.\n\nS Pen\n\n Galaxy S22 Ultra is the first Galaxy S series with an embedded S Pen. Enjoy S Pen precision which lets you handwrite notes, edit excel documents, annotate images and so much more. Enjoy one pen with unlimited ways to create. \n\n All day battery life * + Super-Fast Charging^\n\nA long battery life that keeps on going. The longest battery life ever on Galaxy S Series. You asked for it, we delivered it. We’re breaking the rules of time, giving you zero worries so that you can receive long lasting battery life on the Galaxy S22 Ultra. It also charges super-fast, so you get hours of power from only minutes of charge.^\n\n Nightography\n\nIntroducing Nightography - breaking the rules of video to extend from sunrise to nightfall. Our largest pixel sensor and auto frame rate bring Nightography to life. Gone are the days of being limited to light. It’s your time to create and connect in all hours of the day. Create the perfect video while exploring the best part of the day.\n\nBrightVision\n\nThe brightest display ever in a Galaxy smartphone. Our most stunning display experience yet with increased brightness*, so you can experience our brightest display for the brightest day.\n\n*Compared to max brightness of Samsung S21 Ultra\n\nGorilla Glass Victus+ / Armor Aluminium / IP68*\n\nWe’re breaking the rules of gravity and bringing out our toughest Galaxy S series yet. We understand life can get tough, but this is tougher. With the strongest Gorilla Glass Victus+ and our strongest Armor Aluminium frame on a Galaxy device, you won’t have to always fear the worst from life’s ‘oops’ moments. Night portrait\n\nIt’s time to bring the best part of the day to life. With adaptive Pixel technology, it’s time to create bright, clear photos even at night. It’s time for you to be a pro.\n\n4nm Processor\n\nShift your phone into high gear with Galaxy’s fastest chip. We’re breaking the rules of power with Samsung’s first 4nm processor - the first Galaxy with the fastest chip ever in a Galaxy smartphone.\n\nSpace Zoom\n\nGet close with minimal pixilation using the 10x optical zoom. The sharpest quality zoom on a Galaxy smartphone. Plus, get even closer with improved 100x Space Zoom with new tripod-like stability.* It’s your time to get ultra-close zoom with ultra-fine detail.Seriously fast 5G*\n\nStream, download, post and share videos in a flash with seriously fast 5G* Key Features\n\n6.8" BrightVision display with adaptive 120Hz refresh rate\n\n108MP camera – with new Adaptive Pixel Technology. Four lenses, advanced Nightography and 8K video recording1\n\nThe first Galaxy S series with an embedded S Pen\n\n5,000mAh (typical)2 All day Battery2 with 45W Super-Fast Charging\n\nEquipped with Gorilla Glass Victus+ and Armor Aluminium\n\n256GB on board storage3\n\nThe smallest and most advanced Chip in a Galaxy yet',
      image: "mob6.webp",
      price: 1949,
      quantity: 15,
      subcategory: subcategories[10]._id,
    },
    {
      name: "Motorola G14 128GB (Steel Grey)",
      description:
        'Having a great display makes a huge difference in everything you do. Meet the new moto g14. With an incredibly sharp 6.5" Full HD+ display, it brings movies, shows, games, and video calls to life with picture perfect clarity. The same goes for sound and photos. Hear and feel crystal-clear audio from every direction with stereo speakers and Dolby Atmos®. And capture beautifully detailed photos day or night with an advanced 50MP2 camera system. Beautifully crafted from high-quality materials, moto g14 offers a premium look and feel with a water-repellent design3. With outstanding battery life, 128GB built-in storage4, and powerful octa-core performance, moto g14 covers all the details.\n\n Incredibly sharp 6.5" Full HD+ display\n\n Bring movies, shows, games, and video calls to life with picture perfect clarity.\n\n Stereo speakers with Dolby Atmos®\n\nImmerse yourself in multidimensional sound, listening with improved bass, cleaner vocals, and more clarity.\n\n Advanced 50MP2 camera system\n\nCapture beautifully detailed photos day or night and explore up close with a dedicated Macro Vision lens.\n\n Beautifully crafted design \n\nStylish and water repellent3—made from high quality materials for a premium look and luxurious feel.\n\n Outstanding battery life\n\n Free yourself from the power outlet with a 5000mAh battery that keeps you working and playing for up to 40 hours.1\n\n 128GB built-in storage4\n\n Enjoy plenty of room for photos, movies, songs, and apps—and add up to 1TB more with a microSD card5.\n\n Powerful octa-core performance\n\n Get all the power you need for fast connections, smooth experiences, advanced photography, and more.\n\n  Key Features\n\n  Incredibly sharp 6.5" Full HD+ display\n\n Stereo speakers with Dolby Atmos®\n\n  Advanced 50MP2 camera system\n\n Beautifully crafted design\n\nOutstanding battery life\n\n 128GB built-in storage4\n\n Powerful octa-core performance',
      image: "mob5.webp",
      price: 229,
      quantity: 10,
      subcategory: subcategories[13]._id,
    },
  ]);

  console.log("products seeded");

  //seed user

  await User.create({
    username: "Pamela",
    email: "pamela@testmail.com",
    password: "password12345",
    isAdmin: false,
  });

  await User.create({
    username: "john",
    email: "john@testmail.com",
    password: "password12345",
    isAdmin: true,
  });

  console.log("users seeded");

  process.exit();
});
