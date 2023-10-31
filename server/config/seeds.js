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
    { name: "TV" },
    { name: "Gaming" },
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
    { name: "LED", category: categories[4]._id },
    { name: "Play station games", category: categories[5]._id },
    { name: "XBox games", category: categories[5]._id },

  ]);

  console.log("sub categories seeded");

  //seed products
  const products = await Product.insertMany([
    {
      name: "Apple MacBook Air 13-inch with M1 chip, 7-core GPU, 256GB SSD (Space Grey) [2020]",
      description:
        "Apple’s thinnest and lightest notebook gets supercharged with the Apple M1 chip. Tackle your projects with the blazing-fast 8-core CPU. Take graphics-intensive apps and games to the next level with a 7-core GPU. And accelerate machine learning tasks with the 16-core Neural Engine. All with a silent, fanless design and the longest battery life ever — up to 18 hours.1 MacBook Air. Still perfectly portable. Just a lot more powerful.\n\n",
      features:
        "Apple-designed M1 chip for a giant leap in CPU, GPU and machine learning performance\n\nGo longer than ever with up to 18 hours of battery life1\n\n8-core CPU delivers up to 3.5x faster performance, to tackle projects faster than ever2\n\nSeven GPU cores for faster graphics, graphics-intensive apps and games2\n\n16-core Neural Engine for advanced machine learning\n\n8GB of unified memory so everything you do is fast and fluid\n\nSuperfast SSD storage launches apps and opens files in an instant\n\nFanless design for silent operation\n\n13.3-inch Retina display with P3 wide colour for vibrant images and incredible detail3\n\nFaceTime HD camera with advanced image signal processor for clearer, sharper video calls\n\nThree-microphone array focuses on your voice instead of what’s going on around you\n\nNext-generation Wi-Fi 6 for faster connectivity\n\nTwo Thunderbolt/USB 4 ports for charging and accessories\n\nBacklit Magic Keyboard and Touch ID for secure unlock and payments\n\nmacOS Big Sur introduces a bold new design and major app updates for Safari, Messages and Maps",
      image: "laptop1.webp",
      price: 1299,
      quantity: 20,
      subcategory: subcategories[0]._id,
    },
    {
      name: "Apple MacBook Air 13-inch with M2 chip, 256GB SSD (Midnight) [2022]",
      description:
        "2022 Apple MacBook Air laptop with M2 chip: 13.6-inch Liquid Retina display, 8GB RAM, 256GB SSD storage, backlit keyboard, 1080p FaceTime HD camera. Works with iPhone and iPad; Midnight",
      features:
        "Strikingly Thin Design\nThe redesigned MacBook Air is more portable than ever and weighs just 1.24 kilograms. It’s the incredibly capable laptop that lets you work, play or create just about anything — anywhere.\n\nSupercharged By M2\n Get more done faster with a next-generation 8-core CPU, 8-core GPU and 8GB of unified memory.\n\nUp To 18 Hours of Battery Life\n\nGo all day and into the night, thanks to the power-efficient performance of the Apple M2 chip.1\n\nBig, Beautiful Display\n\nThe 13.6-inch Liquid Retina display features over 500 nits of brightness, P3 wide colour and support for 1 billion colours for vibrant images and incredible detail.2\n\nAdvanced Camera and Audio\n\nLook sharp and sound great with a 1080p FaceTime HD camera, three-mic array and four-speaker sound system with Spatial Audio.\n\nVersatile Connectivity\n\nMacBook Air features a MagSafe charging port, two Thunderbolt ports and a headphone jack.\n\nEasy To Use\n\nYour Mac feels familiar from the moment you turn it on, and works seamlessly with all your Apple devices.\n\nBuilt To Last\n\nThe all-aluminium unibody enclosure is exceptionally durable. And free software updates keep things running smooth and secure for years to come.\n\nSimply Compatible\n\nAll your go-to apps run lightning-fast — including Microsoft 365, Zoom, and many of your favourite iPhone and iPad apps.",
      image: "laptop2.webp",
      price: 1617,
      quantity: 20,
      subcategory: subcategories[0]._id,
    },
    {
      name: "Apple iPhone 15 Pro Max 512GB (Natural Titanium)",
      description:
        "iPhone 15 Pro Max. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customisable Action button and the most powerful iPhone camera system ever.\n\n",
      features:
        "Forged In Titanium\n iPhone 15 Pro Max has a strong and light aerospace-grade titanium design with a textured matt glass back. It also features a Ceramic Shield front that’s tougher than any smartphone glass. And it’s splash-, water- and dust-resistant.1\n\nAdvanced Display\nThe 6.7″ Super Retina XDR display2 with ProMotion ramps up refresh rates to 120Hz when you need exceptional graphics performance. Dynamic Island bubbles up alerts and Live Activities. Plus, with Always-On display, your Lock Screen stays glanceable, so you don’t have to tap it to stay in the know.\n\nGame-Changing A17 Pro Chip\nA Pro-class GPU makes mobile games feel so immersive, with rich environments and realistic characters. A17 Pro is also incredibly efficient and helps to deliver amazing all-day battery life.3\n\nPowerful Pro Camera System\nGet incredible framing flexibility with seven pro lenses. Capture super-high-resolution photos with more colour and detail using the 48MP Main camera. And take sharper close-ups from further away with the 5x Telephoto camera on iPhone 15 Pro Max.\n\nCustomisable Action Button\nAction button is a fast track to your favourite feature. Just set the one you want, like Silent mode, Camera, Voice Memo, Shortcut and more. Then press and hold to launch the action.\n\n Pro Connectivity\nThe new USB-C connector lets you charge your Mac or iPad with the same cable you use to charge iPhone 15 Pro Max. With USB 3, you get a huge leap in data transfer speeds.4 And you can download files up to 2x faster using Wi-Fi 6E.5\n\nVital Safety Features\nIf you need emergency services and you don’t have mobile network connection or Wi-Fi, you can use Emergency SOS via satellite.6 With Crash Detection, iPhone can detect a severe car crash and call for help if you can’t.7\n\nDesigned To Make a Difference\niPhone comes with privacy protections that help keep you in control of your data. It’s made from more recycled materials to minimise environmental impact. And it has built-in features that make iPhone more accessible to all.",
      image: "mob1.webp",
      price: 1299,
      quantity: 15,
      subcategory: subcategories[10]._id,
    },
    {
      name: "Samsung Galaxy Z Fold5 5G 512GB (Phantom Black)",
      description:
        "Galaxy Z Fold5 is Samsung's lightest Fold yet1. From watching your favourite TV shows on-the-go or smooth gaming and scrolling with the super-fast display,experience your entertainment on a new level. Take brilliant pictures night and day with a powerful camera, and the epic 30 x Space Zoom means you can even capture the moon. Master the art of multitasking by taking video calls and jotting notes with the S-pen2, no matter where you are. All these features are wrapped up in super-strong glass with an IPX8 water resistant rating3 for that added peace of mind.Unfold a whole new world of possibilities.\n\nEnjoy your entertainment on a big-screen, anywhere.\n\nLook forward to your morning work commute.",
      features:
        'immersive 7.6 inch display" Main & 6.2" cover AMOLED display with up to 120Hz adaptive refresh rate\n\nIPX8 water resistant rating3\n\n50MP OIS main camera with 30 x Space Zoom\n\nFlex Mode lets you adjust the Galaxy Z Fold5 to your desired angle\n\nOcta core Snapdragon 8 Gen2 chipset\n\n4,400mAh Typical Battery with 25W Super-Fast Charging and wireless PowerShare\n\nS Pen compatible2\n\nWhat\'s in the box \n\nHandset \nEjection Pin\nQuick Start Guide\nData Cable (C to C)',

      image: "mob2.webp",
      price: 2799,
      quantity: 10,
      subcategory: subcategories[11]._id,
    },
    {
      name: "Hisense HRCD585BWB 585L French Door Fridge (Black Steel)",
      description:
        "This PureFlat Eclipse refrigerator provides the perfect stage for all of your food and drinks to shine. With its stunning dark interior, it's the ultimate modern centrepiece for any kitchen.",
      features:
        "Dark Interior with antibacterial treatment\n\nConvertible temperature compartment\n\n3 Year Warranty\n\nPlumbed Ice and Water Dispenser\n\n3 Star Energy Rating\n\nPremium black PureFlat design\n\nDark Interior with antibacterial treatment\n\nMetal handle with sleek integrative design\n\nMetal-Tech Cooling\n\nInverter Compressor\n\nFull width shelves with back hanging design\n\nFreezer door baskets\n\nConvertible temperature compartment\n\nFull width Multi Air Flow System\n\nTwin Cooling Technology",

      image: "fridge1.webp",
      price: 2284,
      quantity: 10,
      subcategory: subcategories[6]._id,
    },
    {
      name: "LG GF-MV600 MoodUP 617L French Door LED Colour Panel Fridge",
      description:
        "LG InstaView fridge with MoodUP™ LED colour panels, that can change to suit your vibe.",
      features:
        "InstaView®\n\nWith two quick knocks on the sleek glass panel, see inside and check for your everyday items, favourite snacks and beverages without opening the door, preventing cold air from escaping and keeping food fresher for longer.\n\nSurroundCooling™\nCold air surrounds your food from both the front and back for effective cooling - quickly reducing the temperature of those items stored at the front of the fridge, and helping keep food fresher for longer.\n\nRetractable Shelf\nTall bottles and jugs? No problem. Simply slide the retractable shelf back to make way to fit it all in.\n\nExtra Space Compartments\nSmart storage drawers built-in Clever storage build into the fridge floor, provides additional space for convenient access to small items such as chocolate, eggs or cheese.\n\nInverter Linear Compressor\nWith low vibration and minimal moving parts the LG Inverter Linear Compressor is quiet and durable. As the heart of your refrigerator we back the Inverter Linear Compressor with a 10 year parts warranty.*\n*2 Years parts and labour on the product + 3 years on sealed refrigeration system (compressor, evaporator, dryer and tubing) parts only + 5 years on compressor (part only).\n\nThinQ App\nControl the light up door panels and set the mood with the LG ThinQ app.\n\nMoodUP Colour Collection\n - My Collection\nSelect the color to each door panel. You can make 174,724 combinations.\n\n- Theme Collection\nSelect the pre-set theme color. There are 17 themes.\n\nAdd Mood with Music\nA speaker built into the top of the fridge allows music to be played. Play pre-installed music or sounds to accompany “Theme” or it could be music from your own Bluetooth connected device.",
      image: "fridge2.webp",
      price: 7999,
      quantity: 20,
      subcategory: subcategories[6]._id,
    },
    {
      name: "DJI Mini 4 Pro Drone (DJI RC 2)",
      description:
        "DJI Mini 4 Pro is DJI's most advanced mini-camera drone to date.[4] It integrates powerful imaging capabilities, omnidirectional obstacle sensing, ActiveTrack 360° with the new Trace Mode, and 20km FHD video transmission, bringing even more things to love for pros and beginners alike.",
      features:
        "Take it Easy\nTake off whenever the inspiration strikes. Weighing less than 249g, Mini 4 Pro was designed for convenience on the go,[1] and the drone's weight means there's no need for training or registration in a majority of countries and regions.\n\nOut-sized Imaging Performance\nCapture more complex details easily with Mini 4 Pro's camera, powered by a 1/1.3-inch CMOS sensor featuring Dual Native ISO Fusion, f/1.7 aperture, and 2.4μm 4-in-1 pixels.[5]  More highlight and shadow details with a high dynamic range means uncompromising results in every frame.\n\n Maximum Visual Impact\nGive vibrant scenes the details they deserve with 4K/60fps HDR and 4K/100fps video, while 10-bit D-Log M and HLG help capture a stunning range of colors and provide more flexibility while editing and sharing.\n\n4K/60fps HDR\nPreserve the natural wonder of any moment. 4K/60fps HDR lets you share the nuances of sunset or sunrise in true-to-life quality.n\nSlo-Mo 4K/100fps\nImmerse the audience in every frame. With slow motion in 4K clarity, capture the action on the trails, at the beach, or in your own backyard at 100fps.\n\nHighlight the NightT\nhe improved noise reduction algorithm of Mini 4 Pro's Night Shots  video effectively suppresses noise and facilitates clearer, cleaner footage right from the camera.\n\n1.07 Billion Colors\nRecord in 10-bit D-Log M and capture over one billion colors. The natural color gradations and delicate full-spectrum details mean Mini 4 Pro unlocks pro-level post-production control and expert-level creative editing flexibility.\n\nDynamic on Every Platform\nNo matter where you publish your content, HLG ensures the natural colors and brightness remain true-to-life without adjustment or format conversion due to its high dynamic range.\n\nRAW-Some Photos\nIt's often the little things that matter most. Create More\nLeave battery concerns behind and stay focused on creation with Mini 4 Pro's Intelligent Flight Battery. Enjoy up to 34 minutes of flight time.",

      image: "drone.webp",
      price: 1419,
      quantity: 10,
      subcategory: subcategories[15]._id,
    },
    {
      name: '"Sony 75" X77L Bravia LED 4K Google TV [2023]',
      description:
        'A clear picture, whatever you watch.\n\n Images filmed in 2K and even HD are upscaled close to 4K. Our 4K X-Reality™ PRO uses a unique 4K database to sharpen and refine pictures in real time, revealing extra details.1\n Incredibly sharp 6.5" Full HD+ display\n\n Bring movies, shows, games, and video calls to life with picture perfect clarity.\n\n Stereo speakers with Dolby Atmos®\n\nImmerse yourself in multidimensional sound, listening with improved bass, cleaner vocals, and more clarity.\n\n Advanced 50MP2 camera system\n\nCapture beautifully detailed photos day or night and explore up close with a dedicated Macro Vision lens.\n\n Beautifully crafted design.',
      features:
        'Incredibly sharp 6.5" Full HD+ display\n\n Stereo speakers with Dolby Atmos®\n\n  Advanced 50MP2 camera system\n\n Beautifully crafted design\n\nOutstanding battery life\n\n 128GB built-in storage4\n\n Powerful octa-core performance',
      image: "tv1.webp",
      price: 1795,
      quantity: 10,
      subcategory: subcategories[20]._id,
    },
    {
      name: "MARVEL’S SPIDER-MAN 2",
      description:
        "Spider-Men, Peter Parker and Miles Morales, return for an exciting new adventure in the critically acclaimed Marvel’s Spider-Man franchise.\n\n.Swing, jump and utilise the new Web Wings to travel across Marvel’s New York, quickly switching between Peter Parker and Miles Morales to experience different stories and epic new powers, as the iconic villain Venom threatens to destroy their lives, their city and the ones they love",
      features:
        "An evolution of the Spider-Man story\n The incredible power of the symbiote forces Peter and Miles to face the ultimate test of strength, both inside and outside the mask, as they balance their lives, friendships and their duty to protect those in need.\n\n Experience two playable Spider-Men\n Quickly swap between both Spider-Men as you explore an expanded Marvel’s New York. Experience Peter’s new symbiote abilities and Miles’ explosive bio-electric venom powers, and discover upgradeable, high-tech equipment that enhances the combat experience for extensive gameplay depth and variety.\n\n Battle iconic Marvel Super Villains\nFight against a variety of new and iconic villains, including an original take on the monstrous Venom, the ruthless Kraven the Hunter, the volatile Lizard and many more!",
      image: "spider.webp",
      price: 99,
      quantity: 10,
      subcategory: subcategories[21]._id,
    },
    {
      name: "Assassin's Creed Mirage",
      description:"Experience the story of Basim, a cunning street thief with nightmarish visions, seeking answers and justice as he navigates the bustling streets of ninth-century Baghdad. Through a mysterious, ancient organization known as the Hidden Ones, he will become a deadly Master Assassin and change his fate in ways he never could have imagined.",
      features:"Discover a tightly crafted, narrative-driven action-adventure experience that follows the transformation of a defiant young man into a refined Master Assassin. \n Journey to Alamut, the legendary home of the Assassins who laid the foundations of the Creed in this heartfelt homage to the game that started it all\nExperience a modern take on the iconic features and gameplay that have defined a franchise for 15 years as you parkour seamlessly through the city and stealthily take down targets with more visceral assassinations than ever before.",
      image: "xbox.webp",
      price: 69,
      quantity: 2,
      subcategory: subcategories[22]._id,
    },
    {
      name: "Panasonic LUMIX S5II Full-Frame Mirrorless Camera with 20-60mm Lens [6K Video]",
      description:
        "Focus On What Matters\n\nThe new Phase Hybrid Autofocus is fast, accurate and continuously tracks the subject, meeting the demands of modern content creators. The LUMIX S5II has you covered even in the most challenging situations.\n\n Same Shot. Different Crop.\nModern filmmakers, content creators and vloggers will love the full sensor 6K (3:2) recording in the new S5II. Giving you more room to crop from a single shot while maintaining 4K resolution even with vertical cuts. With endless aspect ratios and guides to help you frame your shot, this is a workflow game changer.\n\nA Look to Suit Your Style\nLove a preset? Now LUMIX S5II gives you the ability to add your favourite LUTs directly into the camera. Get a stylised look instantly without the need to edit your photos and videos.\n\n Long Takes. No Breaks.\nEnjoy unlimited recording time with our new Active Cooling Technology, perfect for hot Aussie summers. \n\n",
      features:
        "24.2MP CMOS Sensor - Superior high-sensitivity performance and excellent dynamic range\n\nPhase Hybrid Auto Focus – Fast & Accurate Autofocus System\n\n  Active I.S. Technology - Get incredible, stable footage, even when on the move\n\n Image Engine with L² Technology - Approx. 2x higher-speed signal processing\n\nREAL TIME LUT - load-in your favourite look and capture it in camera\n\nLUMIX S 20-60mm F3.5-5.6 Lens included",
      image: "camera1.webp",
      price: 2898,
      quantity: 20,
      subcategory: subcategories[17]._id,
    },
    {
      name: "Nokia G42 5G 128GB (Pink)",
      description:
        "Snap, share, shop, stream – do it all at your pace with 5G² connectivity. Take stunningly clear shots with AI-powered imaging and get them on your socials fast. Go for days without charging and for years without worry – the 3-day battery³ will take you through the weekend, while QuickFix repairability means you can make repairs at home and keep your phone for longer.",
      features:
        "5G connectivity² \nFast network speeds, powered by the Snapdragon® 480+ 5G chipset.\n\n screen, big audio \n6.56” HD+ display and OZO Playback for immersive videos and music.\n\n Stunning photos\nUsing AI algorithms, the 50 MP camera takes shareable shots, day or night.\n\n Up to 3-day battery life³\nForgot the charger? Nokia G42 5G will see you through the weekend.\n\nSo secure\n With Android™ 13, you have more control over what information apps can and can’t access including specific photos, videos and clipboard history. With up to 3 years of monthly security updates,¹ you won’t be worrying about ‘outdated protection’ any time soon.",
      image: "mob3.webp",
      price: 449,
      quantity: 10,
      subcategory: subcategories[13]._id,
    },
    {
      name: "Google Pixel 8 5G 128GB (Rose)",
      description:
        "Meet Pixel 8. The helpful phone engineered by Google, with an amazing camera, powerful security and an all-day battery.1 With Google AI, you can do more, even faster – like fix photos, screen calls and get answers.2 And Pixel 8 has personal safety features for added peace of mind.3\n\n",
      features:
        "The power behind Google AI on Pixel. \n  Google Tensor G3 is Pixel’s most powerful chip yet. Its custom-designed with Google AI for cutting-edge photo and video features and smart ways to help throughout the day. And it makes Pixel 8 super fast and efficient.\n\nA stunning display.\n Pixel's 6.2-inch high-resolution display delivers sharp, vivid colours and rich detail.4 And it has a refresh rate up to 120Hz for smoother gaming, scrolling and switching between apps.5\n\n Pixel's brightest display yet.\n  Pixel 8 outshines other Pixel displays for higher peak brightness.6 So you can see your screen clearly, even in direct sunlight.\n\n The super dependable all-day battery. \nPixel's Adaptive Battery can last over 24 hours.7 Turn on Extreme Battery Saver, and it can last up to 72 hours for power when you need it most.7 And your Pixel can charge faster than ever.8\n\n Fresh, modern design.\nPixel 8 raises the bar for beautiful design with contoured edges, a satin finish and stylish colours. And it's made with approximately 18% recycled materials (based on weight).",

      image: "mob4.webp",
      price: 1199,
      quantity: 15,
      subcategory: subcategories[12]._id,
    },
    {
      name: "Samsung Galaxy S22 Ultra 5G 256GB (Green)",
      description:
        "Galaxy S22 Ultra\n\nWe are breaking the rules of innovation with the Galaxy S22 Ultra. Setting the standard at being our most epic smartphone. We know you want the best and that is why we are breaking all the rules. With all day battery life, our most advanced pro-grade camera, our brightest display and a Galaxy first with a built in S-Pen, Ultra easily lives up to its name.\n\n Pro-grade Camera\n\nOur most advanced Pro-grade camera yet. Shoot in 108MP - the highest resolution on a smartphone in Australia. Use three lenses including ultra-wide to take photos which are clear and bright thanks to laser autofocus and Night Mode. Now all cameras- front and back – support Portrait Mode at night. Get ready for a camera so good, it can make everyone a pro.\n\nS Pen\n\n Galaxy S22 Ultra is the first Galaxy S series with an embedded S Pen. Enjoy S Pen precision which lets you handwrite notes, edit excel documents, annotate images and so much more. Enjoy one pen with unlimited ways to create. \n\n All day battery life * + Super-Fast Charging^\n\nA long battery life that keeps on going.",

      features:
        '6.8" inch BrightVision display with adaptive 120Hz refresh rate\n\n108MP camera – with new Adaptive Pixel Technology. Four lenses, advanced Nightography and 8K video recording1\n\nThe first Galaxy S series with an embedded S Pen\n\n5,000mAh (typical)2 All day Battery2 with 45W Super-Fast Charging\n\nEquipped with Gorilla Glass Victus+ and Armor Aluminium\n\n256GB on board storage3\n\nThe smallest and most advanced Chip in a Galaxy yet',
      image: "mob6.webp",
      price: 1949,
      quantity: 15,
      subcategory: subcategories[13]._id,
    },
    {
      name: "Motorola G14 128GB (Steel Grey)",
      description:
        'Having a great display makes a huge difference in everything you do. Meet the new moto g14. With an incredibly sharp 6.5" Full HD+ display, it brings movies, shows, games, and video calls to life with picture perfect clarity. The same goes for sound and photos. Hear and feel crystal-clear audio from every direction with stereo speakers and Dolby Atmos®. And capture beautifully detailed photos day or night with an advanced 50MP2 camera system. Beautifully crafted from high-quality materials, moto g14 offers a premium look and feel with a water-repellent design3. With outstanding battery life, 128GB built-in storage4, and powerful octa-core performance, moto g14 covers all the details.\n\n Incredibly sharp 6.5" Full HD+ display\n\n Bring movies, shows, games, and video calls to life with picture perfect clarity.\n\n Stereo speakers with Dolby Atmos®\n\nImmerse yourself in multidimensional sound, listening with improved bass, cleaner vocals, and more clarity.\n\n Advanced 50MP2 camera system\n\nCapture beautifully detailed photos day or night and explore up close with a dedicated Macro Vision lens.\n\n Beautifully crafted design.',
      features:
        'Incredibly sharp 6.5" Full HD+ display\n\n Stereo speakers with Dolby Atmos®\n\n  Advanced 50MP2 camera system\n\n Beautifully crafted design\n\nOutstanding battery life\n\n 128GB built-in storage4\n\n Powerful octa-core performance',
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
