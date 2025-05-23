// productData.ts

export const productData = {
    INFINITY: {
        productImage: "infinity.png",
        productType: 2,
        productName: "INFINITY",
        title: "SIROLIMUS-ELUTING CORONARY STENT SYSTEM",
        content: "The INFINITY Sirolimus-Eluting Coronary Stent System is a state-of-the-art device used in interventional cardiology to treat coronary artery disease (CAD). It features a fully biodegradable, biocompatible polymer (PLGA) with a precise sirolimus loading density of 1.2 ± 0.2 µg/mm and a uniform 6 µm coating. The stent is designed for consistent drug release, promoting optimal neointimal coverage and reducing the risk of In-Stent Restenosis (ISR) and late thrombosis. Mounted on a hydrophilic-coated PTCA catheter, the system ensures safe and effective stent deployment.",
        // description: [
        //     "is a high-performance stent designed to treat coronary artery disease (CAD). It features very thin struts (45 μm) that help the artery heal quickly after the procedure, reducing the risk of complications. The stent is built with a special locking mechanism that ensures strong support for the artery while minimizing any chance of the stent moving or collapsing.",
        //     "The stent's design includes:",
        //     "- Bulge Strut Width (Hinge): 62.5 μm",
        //     "- Radial Strut Width: 105 μm",
        //     "- Connecting Strut Width: 63 μm",
        //     "Made from a strong and flexible cobalt-chromium alloy (CoCr L605), the INFINITY stent combines the best features of several top stent technologies, such as ABLUMINAS DES, SYNERGY, ULTIMASTER, DESYNE, XIENCE, PROMUS, YUKON PC, RESOLUTE, and BIOMATREX, to provide reliable and effective treatment for blocked arteries."
        // ],
        stentSpecification: {
            title: "Stent Specification",
            details: [
                { parameter1: "Available stent lengths", specification1: "10, 13, 15, 18, 20, 24, 28, 32, 36, 40, 44 & 48mm", parameter2: "Delivery System Type", specification2: "Monorail rapid exchange" },
                { parameter1: "Available stent diameters", specification1: "2.25, 2.50, 2.75, 3.00, 3.50 & 4.00mm", parameter2: "Polymer Type", specification2: "Biodegradable polymer" },
                { parameter1: "Stent Material", specification1: "L605 Cobalt-Chromium (Co-cr) alloy", parameter2: "Nominal Pressure", specification2: "8 Bar" },
                { parameter1: "Stent Design", specification1: "Open and closed hybrid cell design", parameter2: "Rated Burst Pressure", specification2: "16 Bar" },
                { parameter1: "Stent Platform", specification1: "Cobal + C", parameter2: "Guidewire Compatibility", specification2: "0.014”" },
                { parameter1: "Stent foreshortening", specification1: "<2%", parameter2: "Guiding Catheter Compatibility", specification2: "5F" },
                { parameter1: "Stent Recoil", specification1: "<4%", parameter2: " ", specification2: "" },
                { parameter1: "Stent struct thickness", specification1: "63µm", parameter2: "", specification2: "" },
                { parameter1: "Drug", specification1: "Sirolimus ", parameter2: "", specification2: "" },
                { parameter1: "Coating Thickness", specification1: "6µm", parameter2: "", specification2: "" }
            ]
        },
        // guidewireCompatibilityData: [
        //     {
        //         title: "Guiding Catheter Compatibility",
        //         data: [
        //             "0.014″",
        //             "5F",
        //             "0.018″",
        //             "5F, 6F and 7F",
        //             "0.035″",
        //             "7F, 8F and 9F",
        //         ]
        //     },
        //     {
        //         title: "Sheath Compatibility",
        //         data: [
        //             "0.014″",
        //             "4F",
        //             "0.018″",
        //             "4F to 5F",
        //             "0.035″",
        //             "5F to 7F",
        //         ]
        //     }
        // ],
        deliverySystems: {
            title: "Delivery Systems",
            details: [
                "Delivery System Type",
                "Monorail rapid exchange",
                "Polymer Type",
                "Biodegradable polymer",
                "Nominal Pressure",
                "8 Bar",
                "Rated Burst Pressure",
                "16 Bar",
                "Guidewire Compatibility",
                "0.014″",
                "Guiding Catheter Compatibility",
                "5F"
            ]
        }
    },
    SLEEK: {
        productImage: "sleek.png",
        productType: 4,
        productName: "SLEEK",
        title: "NC BALLOON CATHETER (POST DIALATION CATHETER)",
        content: "The SLEEK NC Balloon Catheter is a high-performance post-dilatation catheter designed for precise control and durability in coronary interventions. It features a non-compliant balloon that delivers focused and consistent inflation, making it ideal for achieving optimal stent expansion. The catheter offers excellent trackability, allowing it to navigate complex and tortuous anatomies with ease. Its sleek, low-profile design minimizes the risk of collisions with stent struts, ensuring safer and more effective procedures.",
        // description: [
        //     "The SLEEK NC Balloon Catheter is a state-of-the-art post-dilatation catheter engineered for optimal performance in coronary interventions. It features a durable, non-compliant balloon made from proprietary material, providing high pressure capability and controlled inflation, ideal for various dilatation needs.",
        //     "Key features include:",
        //     "- Superior Trackability: The highly flexible catheter shaft and ultra-smooth transition area allow the catheter to navigate complex and tortuous anatomies with ease.",
        //     "- Tailor-Made Design: The sleek polymer finish prevents collision with stent struts, while the direct torque transmission design ensures superior steerability and control.",
        //     "- Enhanced Pushability: The catheter’s low profile, combined with a new jacketed hypotube, offers excellent pushability and progressive flexibility, especially in the distal area.",
        //     "- Friction-Free Performance: A lubricious hydrophilic coating minimizes friction, ensuring smooth device navigation.",
        //     "- Ergonomic and Safe: A transparent hub facilitates safe connections, with proximal marker bands at 90 cm and 100 cm for accurate positioning.",
        //     "Technical specifications include a 0.90 mm distal shaft outer diameter, 0.72 mm proximal shaft outer diameter, and compatibility with 0.014” guidewires. The catheter supports a nominal inflation pressure of 10 ATM and a rated burst pressure of 18 ATM, with two platinum iridium marker bands and a tip profile of 0.016."
        // ],
        guidewireCompatibilityData: {
            title: "SLEEK NC Balloon Catheter",
            details: [
                "Balloon Compliance",
                "Non-compliant",
                "Distal Shaft (Outer Diameter)",
                "0.90 mm",
                "Proximal Shaft (Outer Diameter)",
                "0.72 mm",
                "Usable catheter length",
                "1414 mm",
                "Crossing Profile",
                "0.8 mm to 1.4 mm",
                "Minimum guide catheter compatible",
                "0.058'' /5 Fr",
                "Guidewire Compatibility",
                "0.014”",
                "Nominal Inflation Pressure",
                "10 ATM",
                "Rated Burst Pressure",
                "18 ATM",
                "Marker Bands",
                "Two platinum iridium markers",
                "Tip Profile",
                "0.016"
            ]
        },
        // guidewireCompatibilityData: [
        //     {
        //         title: "Guiding Catheter Compatibility",
        //         data: [
        //             "0.014″",
        //             "5F",
        //             "0.018″",
        //             "5F",
        //             "0.035″",
        //             "7F",
        //         ]
        //     }
        // ]
    },
    SWIFT: {
        productImage: "swift.png",
        productType: 5,
        productName: "SWIFT",
        title: "SC BALLOON CATHETER (PRE - DIALATION CATHETER)",
        content: "The SWIFT SC Balloon Catheter is a semi-compliant pre-dilatation catheter engineered for optimal crossability and pushability. Its flexible, tapered tip and advanced hydrophilic coating ensure seamless navigation through challenging and tortuous anatomies, reducing the risk of vessel trauma. The catheter's high radiopacity, facilitated by integrated markers, allows for precise positioning and real-time monitoring during the procedure. Designed with a low-profile, the SWIFT SC Balloon Catheter offers reliable performance in complex lesions, making it an essential tool for effective pre-dilatation and optimal stent delivery.",
        // description: [
        //     "The SLEEK NC Balloon Catheter is a state-of-the-art post-dilatation catheter engineered for optimal performance in coronary interventions. It features a durable, non-compliant balloon made from proprietary material, providing high pressure capability and controlled inflation, ideal for various dilatation needs.",
        //     "Key features include:",
        //     "- Superior Trackability: The highly flexible catheter shaft and ultra-smooth transition area allow the catheter to navigate complex and tortuous anatomies with ease.",
        //     "- Tailor-Made Design: The sleek polymer finish prevents collision with stent struts, while the direct torque transmission design ensures superior steerability and control.",
        //     "- Enhanced Pushability: The catheter’s low profile, combined with a new jacketed hypotube, offers excellent pushability and progressive flexibility, especially in the distal area.",
        //     "- Friction-Free Performance: A lubricious hydrophilic coating minimizes friction, ensuring smooth device navigation.",
        //     "- Ergonomic and Safe: A transparent hub facilitates safe connections, with proximal marker bands at 90 cm and 100 cm for accurate positioning.",
        //     "Technical specifications include a 0.90 mm distal shaft outer diameter, 0.72 mm proximal shaft outer diameter, and compatibility with 0.014” guidewires. The catheter supports a nominal inflation pressure of 10 ATM and a rated burst pressure of 18 ATM, with two platinum iridium marker bands and a tip profile of 0.016."
        // ],
        guidewireCompatibilityData: {
            title: "SWIFT SC Balloon Catheter",
            details: [
                "Distal Shaft (Outer Diameter)",
                "Semi complaint",
                "Balloon type",
                "0.90 mm",
                "Proximal Shaft (Outer Diameter)",
                "0.72 mm",
                "Lower crossing length",
                "0.7mm to 130mm",
                "Minimum guide catheter compatible",
                "0.058” /5 Fr",
                "Nominal Inflation Pressure",
                "8 ATM",
                "Rated Burst Pressure",
                "16 ATM",
                "Marker Bands",
                "Two platinum iridium markers",
                "Tip Profile",
                "0.018″",
                // "Guidewire Compatibility",
                // "0.014″, 0.018″, 0.035″",
                // "Sheath Compatibility",
                // "Compatible with 5F to 7F sheaths",
                // "Balloon Diameter Range",
                // "1.00 mm to 4.00 mm",
                // "Usable Catheter Length",
                // "100 mm, 245 mm, 900 mm, 1414 mm",
                // "Crossing Profile",
                // "Low-profile design for improved crossability",
                // "Balloon Type",
                // "Semi-compliant",
                // "Catheter Design",
                // "Rapid Exchange, flexible with advanced hydrophilic coating"
            ]
        },
        // guidewireCompatibilityData: [
        //     {
        //         title: "Guiding Catheter Compatibility",
        //         data: [
        //             "0.014″",
        //             "5F",
        //             "0.018″",
        //             "6F",
        //             "0.035″",
        //             "7F",
        //         ]
        //     }
        // ]
    },
    INTIMA: {
        productImage: "intima.png",
        productType: 3,
        productName: "INTIMA",
        title: "Everolimus-Eluting Coronary Stent System",
        content: "The INTIMA Everolimus-Eluting Coronary Stent System features ultra-thin 60μm struts with a 3μm uniform drug coating for precise, controlled release. It offers excellent radial strength, minimal recoil, and early endothelialization, ideal for complex coronary interventions. The biodegradable polymer ensures biocompatibility while reducing the risk of in-stent restenosis. Its advanced design allows for smooth navigation through challenging anatomies, making it a reliable choice for both routine and complex procedures.",
        // description: [
        //     "The INTIMA Everolimus-Eluting Coronary Stent System is designed for advanced coronary interventions, combining high performance with safety. The stent features ultra-thin 60μm struts, enhancing flexibility and promoting early endothelialization. A uniform 3μm drug coating ensures controlled, gradual release of Everolimus, reducing the risk of in-stent restenosis and late thrombosis. The stent’s unique design, along with its biodegradable polymer, provides superior radial strength with minimal recoil and foreshortening, ensuring optimal apposition and reliable performance in complex coronary lesions. Available in a wide range of sizes, the INTIMA stent is compatible with 0.014” guidewires and 5F guiding catheters."
        // ],
        deliverySystems: {
            title: "",
            details: [
                "Nominal Pressure",
                "8 Bar",
                "Rated Burst Pressure",
                "16 Bar/ ATM up to 4.00mm diameter",
                "Rated Burst Pressure",
                "14 Bar/ ATM up to 4.50mm,5.00 diameter",
                "Guidewire Compatibility",
                "0.014”",
                "Guiding Catheter Compatibility",
                "5F",
                "Delivery System",
                "Hydrophilic coated",
                "Proximal Shaft Diameter",
                "2.28F (0.76mm)",
                "Distal Shaft Diameter",
                "2.67F (0.89mm)",
                // "Delivery System Tip Entry Profile",
                // "0.018” (2.28F/0.76mm)",
            ]
        },
        stentSpecification: {
            title: "Stent Specification",
            details: [
                { parameter1: "Available stent lengths", specification1: "8, 10, 12, 13, 15, 16, 18, 20, 24, 28, 32, 36, 40, 42, 44 & 48mm", parameter2: "Delivery System Type", specification2: "Monorail rapid exchange" },
                { parameter1: "Available stent diameters", specification1: "2.25, 2.50, 2.75, 3.00, 3.50, 4.00, 4.50 & 5.00mm", parameter2: "Polymer Type", specification2: "Biodegradable polymer" },
                { parameter1: "Stent Material", specification1: "L605 Cobalt-Chromium (Co-cr) alloy", parameter2: "Nominal Pressure", specification2: "8 Bar" },
                { parameter1: "Stent Design", specification1: "Open and closed hybrid cell design", parameter2: "Rated Burst Pressure", specification2: "16 Bar/ ATM up to 4.00mm diameter" },
                { parameter1: "Stent Platform", specification1: "Cobal + C", parameter2: "Guidewire Compatibility", specification2: "0.014”" },
                { parameter1: "Stent foreshortening", specification1: "<2%", parameter2: "Guiding Catheter Compatibility", specification2: "5F" },
                { parameter1: "Stent Recoil", specification1: "<4%", parameter2: "Delivery System ", specification2: "Hydrophilic coated" },
                { parameter1: "Stent struct thickness", specification1: "60µm", parameter2: "Tip Entry Profile", specification2: "0.018”" },
                { parameter1: "Drug", specification1: "Everolimus", parameter2: "Proximal Shaft Diameter", specification2: "0.76mm" },
                { parameter1: "Coating Thickness", specification1: "3µm", parameter2: "Distal Shaft Diameter", specification2: "0.89mm" }
            ]
        },
        // guidewireCompatibilityData: [
        //     {
        //         title: "Guiding Catheter Compatibility",
        //         data: [
        //             "Guidewire Compatibility",
        //             "0.014”",
        //             "Guiding Catheter Compatibility",
        //             "5F",
        //             "Hydrophilic Coating",
        //             "Yes",
        //         ]
        //     }
        // ]
    },
    ENDOSTENT: {
        productImage: "endostent.png",
        productType: 1,
        productName: "ENDOSTENT",
        title: "Sirolimus-Eluting Coronary Stent System",
        content: "The ENDOSTENT Sirolimus-Eluting Coronary Stent System is engineered to advance coronary interventions with a focus on early endothelialization and effective drug delivery. Featuring ultra-thin struts (63 μm) that minimize recoil and provide high radial strength, this stent ensures optimal vessel support and reduced foreshortening (<2%). The stent is coated with sirolimus, with a precise 6 μm thickness for controlled, sustained drug release over 90 to 120 days, promoting long-term vessel patency. Available in a range of diameters(2.25 to 4.00 mm) and lengths(10 to 48 mm), the ENDOSTENT offers versatile sizing to accommodate various anatomical needs. Its design includes both open and closed cell configurations to enhance flexibility and conformability.",
        // description: [
        //     "The ENDOSTENT Sirolimus-Eluting Coronary Stent System is engineered to enhance coronary interventions with advanced drug-eluting technology. It utilizes ultra-thin struts (63 μm) for early endothelialization and reduced stent recoil, with a high radial strength to maintain vessel patency. The stent's design includes both open and closed cell configurations, and it comes in various lengths and diameters to suit different anatomical needs.",
        //     "The drug coating features sirolimus with a precise 6 μm thickness and a loading density of 1.2 ± 0.2 μg/mm², providing controlled drug release over time. The system is designed with minimal foreshortening (<2%) and high radial strength, ensuring stability and durability within the vessel.",
        //     "Technical specifications include compatibility with 0.014” guidewires and 5F guiding catheters, a nominal pressure of 8 Bar, and a rated burst pressure of 16 Bar. The stent's delivery system is a monorail rapid exchange type, with a tip entry profile of 0.018” and available in multiple sizes to fit various clinical scenarios."
        // ],
        stentSpecification: {
            title: "Stent Specification",
            details: [
                { parameter1: "Available stent lengths", specification1: "10, 13, 15, 18, 20, 24, 28, 32, 36, 40, 44 & 48mm", parameter2: "Delivery System Type", specification2: "Monorail rapid exchange" },
                { parameter1: "Available stent diameters", specification1: "2.25, 2.50, 2.75, 3.00, 3.50 & 4.00mm", parameter2: "Polymer Type", specification2: "Biodegradable polymer" },
                { parameter1: "Stent Material", specification1: "L605 Cobalt-Chromium (Co-cr) alloy", parameter2: "Nominal Pressure", specification2: "8 Bar" },
                { parameter1: "Stent Design", specification1: "Open and closed hybrid cell design", parameter2: "Rated Burst Pressure", specification2: "16 Bar" },
                { parameter1: "Stent Platform", specification1: "Cobal + C", parameter2: "Guidewire Compatibility", specification2: "0.014”" },
                { parameter1: "Stent foreshortening", specification1: "<2%", parameter2: "Guiding Catheter Compatibility", specification2: "5F" },
                { parameter1: "Stent Recoil", specification1: "<4%", parameter2: "Delivery System ", specification2: "Hydrophilic coated" },
                { parameter1: "Stent struct thickness", specification1: "63µm", parameter2: "Tip Entry Profile", specification2: "0.018”" },
                { parameter1: "Drug", specification1: "Sirolimus ", parameter2: "Proximal Shaft Diameter", specification2: "0.76mm" },
                { parameter1: "Coating Thickness", specification1: "6µm", parameter2: "Distal Shaft Diameter", specification2: "0.89mm" }
            ]
        },
        deliverySystems: {
            title: "",
            details: [
                "Loading Density",
                "1.2 ± 0.2 μg/mm²",
                "Nominal Pressure",
                "8 Bar",
                "Rated Burst Pressure",
                "16 Bar",
                "Guidewire Compatibility",
                "0.014”",
                "Guiding Catheter Compatibility",
                "5F",
                "Delivery System",
                "Monorail rapid exchange",
                "Tip Entry Profile",
                "0.018”",
                "Proximal Shaft Diameter",
                "0.76 mm",
                "Distal Shaft Diameter",
                "0.89 mm",
                // "Usable Catheter Length",
                // "100 mm, 245 mm, 900 mm, 1414 mm"
            ]
        }
    }
};
