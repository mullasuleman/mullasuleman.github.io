const zones = [{
	templateId: "nav-template",
	containerId: "header-nav-ul",
	context: {
		links: [
			{ label: "Experience", url: "/#experience" },
			{ label: "Skills", url: "/#skills" },
			{ label: "Projects", url: "/#projects" },
			{ label: "Contact", url: "/#contact" }
		]
	}
}, {
	templateId: "footer-nav-template",
	containerId: "footer-nav",
	context: {
		links: [
			{ label: "Trailblazer", url: "https://www.salesforce.com/trailblazer/mullasuleman" },
			{ label: "LinkedIn", url: "https://linkedin.com/in/mullasuleman" },
			{ label: "GitHub", url: "https://github.com/mullasuleman/" }
		]
	}
}, {
	templateId: "badges-template",
	containerId: "cert-badge-grid",
	context: {
		badges: [
			{
				name: "Salesforce Certified Data Cloud Consultant",
				image: "https://drm.my.salesforce.com/servlet/servlet.ImageServer?id=015Rf00000MACb7&oid=00DF0000000gZsu&lastMod=1746777787000",
				link: "https://www.salesforce.com/trailblazer/mullasuleman"
			},
			{
				name: "Salesforce Certified Marketing Cloud Engagement Consultant",
				image: "https://drm.my.salesforce.com/servlet/servlet.ImageServer?id=015Rf00000MAExu&oid=00DF0000000gZsu&lastMod=1746779207000",
				link: "https://www.salesforce.com/trailblazer/mullasuleman"
			},
			{
				name: "Salesforce Certified Marketing Cloud Engagement Developer",
				image: "https://drm.my.salesforce.com/servlet/servlet.ImageServer?id=015Rf00000MACck&oid=00DF0000000gZsu&lastMod=1746779293000",
				link: "https://www.salesforce.com/trailblazer/mullasuleman"
			},
			{
				name: "Salesforce Certified Marketing Cloud Account Engagement Consultant",
				image: "https://drm.my.salesforce.com/servlet/servlet.ImageServer?id=015Rf00000MAEY5&oid=00DF0000000gZsu&lastMod=1746778751000",
				link: "https://www.salesforce.com/trailblazer/mullasuleman"
			},
			{
				name: "Marketing Cloud Personalization Accredited Professional",
				image: "https://drm.my.salesforce.com/servlet/servlet.ImageServer?id=015Rf00000MAIgf&oid=00DF0000000gZsu&lastMod=1746787093000",
				link: "https://www.salesforce.com/trailblazer/mullasuleman",
				invert: true
			},
			{
				name: "Salesforce Certified Platform Administrator",
				image: "https://drm.my.salesforce.com/servlet/servlet.ImageServer?id=015Rf00000MAGlB&oid=00DF0000000gZsu&lastMod=17467806380000",
				link: "https://www.salesforce.com/trailblazer/mullasuleman"
			},
		]
	}
}, {
	templateId: "exp-template",
	containerId: "exp-list",
	context: {
		items: [
			{
				year: "Jul 2025 - Present",
				active: true,
				title: "Product Team Lead",
				company: "Vigorate | Toronto, Ontario",
				desc: "Leading research, development and implementations in Salesforces Next-gen, AI-first product offerings including but not limited to Agentforce, Marketing Cloud Next and Salesforce Personalization. Training and mentoring wider team on the Next-gen Salesforce products.",
				tech: ["Marketing Cloud Next", "Data 360", "Salesforce Personalization", "Agentforce", "Marketing Cloud Engagement", "Marketing Cloud Account Engagement", "Marketing Cloud Personalization"],
				clients: [
					{ name: "AI Real Estate", link: "https://airealestate.ca/" },
					{ name: "Arvig", link: "https://arvig.com/" },
					{ name: "FlexCare", link: "https://www.flexcarestaff.com/" },
					{ name: "Formerra", link: "https://www.formerra.com/" },
					{ name: "KPMG", link: "https://kpmg.com/ca/" },
					{ name: "Nestlé Purina", link: "https://www.purina.ca/" },
					{ name: "NETSCOUT", link: "https://www.netscout.com/" },
					{ name: "Panasonic", link: "https://www.panasonic.com/ca/" },
					{ name: "Rogers", link: "https://www.rogers.com/" },
					{ name: "Sun Life Global Investments", link: "https://www.sunlifeglobalinvestments.com/" },
					{ name: "Symcor", link: "https://www.symcor.ca/" },
					{ name: "Winchester Interconnect", link: "https://www.winconn.com/" },
					{ name: "Yamaha Motor Canada", link: "https://www.yamaha-motor.ca/" },
				]
			},
			{
				year: "Feb 2025 - Jul 2025",
				active: false,
				title: "Salesforce Marketing Cloud Team Lead",
				company: "Vigorate | Toronto, Ontario",
				desc: "Led a team of developers focusing on Salesforce Marketing Cloud Engagement, Account Engagement and Personalization solution architecture including strategy, integrations, use case development, and customer journey development.",
				tech: ["Marketing Cloud Engagement", "Marketing Cloud Account Engagement", "Marketing Cloud Personalization"],
				clients: [
					{ name: "Abbott", link: "https://www.ca.abbott/" },
					{ name: "George Brown College", link: "https://www.capitalbrands.com/" },
					{ name: "Harnois Énergies", link: "https://harnoisenergies.com/en/" },
					{ name: "KPMG", link: "https://kpmg.com/ca/" },
					{ name: "Nestlé Purina", link: "https://www.purina.ca/" },
					{ name: "NETSCOUT", link: "https://www.netscout.com/" },
					{ name: "Rogers", link: "https://www.rogers.com/" },
					{ name: "Validity Inc.", link: "https://www.validity.com/" },
					{ name: "Walmart Canada", link: "https://www.walmart.ca/" },
					{ name: "Walmart Vision Centre", link: "https://www.walmart.ca/en/cp/vision-centre/6000206074206" },
					{ name: "Yamaha Motor Canada", link: "https://www.yamaha-motor.ca/" },
				]
			},
			{
				year: "Nov 2022 - Feb 2025",
				active: false,
				title: "Salesforce Marketing Cloud Developer/Consultant",
				company: "Vigorate | Toronto, Ontario",
				desc: "Managed end-to-end implementations of automated lifecycle journeys and various integrations in Salesforce Marketing Cloud Engagement, Account Engagement and Personalization for a diverse client portfolio, translating complex business requirements into scalable, cross-channel technical solutions.",
				tech: ["Marketing Cloud Engagement", "Marketing Cloud Account Engagement", "Marketing Cloud Personalization", "AMPScript", "SSJS", "SQL", "Handlebars", "JavaScript"],
				clients: [
					{ name: "Abbott", link: "https://www.ca.abbott/" },
					{ name: "C2 Education", link: "https://www.c2educate.com/" },
					{ name: "CAA", link: "https://www.caasco.com/" },
					{ name: "Canon", link: "https://www.canon.ca/" },
					{ name: "Hotel X Toronto", link: "https://www.hotelxtoronto.com/" },
					{ name: "KPMG", link: "https://kpmg.com/ca/" },
					{ name: "Mitsubishi Motors", link: "https://www.mitsubishi-motors.ca/" },
					{ name: "Moneris", link: "https://www.moneris.com/" },
					{ name: "Nestlé Purina", link: "https://www.purina.ca/" },
					{ name: "Rogers", link: "https://www.rogers.com/" },
					{ name: "SkipTheDishes", link: "https://www.skipthedishes.com/" },
					{ name: "Walmart Canada", link: "https://www.walmart.ca/" },
				]
			},
			{
				year: "May 2021 - Nov 2022",
				active: false,
				title: "Frontend Developer",
				company: "Vigorate | Toronto, Ontario",
				desc: "Front-end development on Salesforce Marketing Cloud Engagement and Account Engagement platforms, developing dynamic email, SMS and landing pages designed for complex personalized experiences. Managing email and SMS deployments for Mid-market and Enterprise clients.",
				tech: ["Marketing Cloud Engagement", "Marketing Cloud Account Engagement", "Email on Acid", "Browserstack"],
				clients: [
					{ name: "Brampton Brick", link: "https://bramptonbrick.com/" },
					{ name: "CAA", link: "https://www.caasco.com/" },
					{ name: "Canon", link: "https://www.canon.ca/" },
					{ name: "Centric Software", link: "https://www.centricsoftware.com/" },
					{ name: "KPMG", link: "https://kpmg.com/ca/" },
					{ name: "Kruger Inc.", link: "https://www.kruger.com/" },
					{ name: "Mitsubishi Motors", link: "https://www.mitsubishi-motors.ca/" },
					{ name: "Moneris", link: "https://www.moneris.com/" },
					{ name: "Nestlé Purina", link: "https://www.purina.ca/" },
					{ name: "Panasonic", link: "https://www.panasonic.com/ca/" },
					{ name: "Rogers", link: "https://www.rogers.com/" },
					{ name: "SickKids", link: "https://www.sickkids.ca/" },
				]
			},
			{
				year: "Mar 2021 - May 2021",
				active: false,
				title: "Hybrid QA Tester & Web Developer",
				company: "Brain Box Labs | Toronto, Ontario",
				desc: "Front-end development and quality assurance for in-house CMS platform and FinTech client portfolio.",
				tech: ["Vue.js", "Laravel", "Browserstack", "Sentry",],
				clients: [
					{ name: "Intact Public Entities Inc.", link: "https://www.intactpublicentities.ca/" },
					{ name: "Brokerlink Inc.", link: "https://www.brokerlink.ca/" }
				]
			},
			{
				year: "Apr 2020 - Mar 2021",
				active: false,
				title: "QA Specialist & Frontend Developer",
				company: "Vigorate | Toronto, Ontario",
				desc: "Quality assurance across Salesforce Marketing Cloud Engagement and Account Engagement emails and landing pages designed for complex personalization requirements while occasionally assisting Frontend team with email development. Completing email pre-deployment checks ensuring highest level of Content, rendering, compliance and deployment standards.",
				tech: ["Marketing Cloud Engagement", "Marketing Cloud Account Engagement", "Email on Acid", "Browserstack"]
			},
			{
				year: "May 2019 - Sep 2019",
				active: false,
				title: "Research Lead & Web Developer",
				company: "Durham College | Oshawa, Ontario",
				desc: "Led a team developing a wayfinding web app for Oshawa Valley Botanical Garden (OVBG) as an applied research project in partnership with City of Oshawa.",
				tech: ["HTML", "CSS", "JavaScript", "GSAP", "QR Code & NFC Interfacing", "Photoshop", "Illustrator"],
				clients: [
					{ name: "City of Oshawa", link: "https://durhamcollege.ca/new-notable/focus-on-innovation/dc-students-create-wayfinding-tool-for-oshawa-valley-botanical-gardens" },
				]
			}
		]
	}
}, {
	templateId: "skills-template",
	containerId: "skills-list",
	context: {
		categories: [
			{
				name: "Salesforce",
				expert: true,
				items: [
					"Marketing Cloud Engagement", "Marketing Cloud Next", "Data 360", "Marketing Cloud Account Engagement", "Marketing Cloud Personalization", "Salesforce Personalization", "SSJS", "AMPScript", "SFMC SQL", "Data 360 SQL"]
			},
			{
				name: "Web Development",
				expert: false,
				items: ["JavaScript", "jQuery", "Handlebar.js", "Node.js", "Express.js", "Vue.js", "PHP", "MySQL", "SASS", "GSAP", "Three.js"]
			},
			{
				name: "Design",
				expert: false,
				items: ["Photoshop", "Illustrator", "XD", "Lightroom", "Figma"]
			},
			{
				name: "Google",
				expert: false,
				items: ["Analytics", "Tag Manager", "AdSense", "Search Console", "Merchant Center", "AppSheet", "Firebase Studio"]
			},
			{
				name: "And More...",
				expert: false,
				items: ["Git & GitHub", "WordPress", "Squarespace", "Shopify"]
			}
		]
	}
}, {
	templateId: "projects-template",
	containerId: "projects-grid",
	context: {
		projects: [
			{
				title: "OVBG, Oshawa",
				desc: "QR code/NFC based, mobile-first web app to guide visitors and present the history of Oshawa Valley Botanical Garden (OVBG). Featured on <a href='https://www.doorsopenontario.on.ca/oshawa/oshawa-valley-botanical-gardens' target='_blank'>Doors Open Ontario</a>. Developed as an applied research project in partnership with City of Oshawa.",
				image: "/assets/ovbg-mockup.jpg",
				tags: ["HTML", "CSS", "JavaScript", "GSAP", "QR Code & NFC Interfacing"],
				link: "/projects/ovbg"
			},
			{
				title: "Connect Four",
				desc: "A classic Connect Four 2-player game developed from scratch with logic that allows the game to be scalable in either direction infinitely (Limited to a board of 7x5 in the demo). Can also be played in console.",
				image: "/assets/connect4-mockup.jpg",
				tags: ["HTML", "CSS", "JavaScript (ES6)"],
				link: "/projects/connect4"
			},
			{
				title: "IBEX Snowboards",
				desc: "A series of snowboards and apperal featuring all original designs inspired by mountain wandering beasts.",
				image: "/assets/ibex-mockup.jpg",
				tags: ["HTML", "CSS", "JavaScript", "Photoshop", "Illustrator"],
				link: "/projects/ibex"
			},
			{
				title: "Family of Eateries",
				desc: "Concept app to showcase the GSAP library to animate page elements in for enhancing user experience.",
				image: "/assets/foe-mockup.jpg",
				tags: ["HTML", "CSS", "jQuery", "GSAP", "Photoshop"],
				link: "/projects/foe"
			},
			{
				title: "FilterBath",
				desc: "Photobooth web app with various filters and stickers, including a \"green screen\" mode to create an image with a custom background.",
				image: "/assets/photobooth-mockup.jpg",
				tags: ["HTML", "CSS", "JavaScript (ES6)", "MediaStream API"],
				link: "/projects/photobooth"
			},
			{
				title: "Abrries Spices Inc.",
				desc: "Custom Shopify direct-to-customer storefront built for a Canadian food product importer and wholesaler.",
				image: "/assets/abrries_mockup.jpg",
				tags: ["Shopify", "HTML", "CSS", "JavaScript (ES6)"],
				link: "https://abrries.ca"
			}
		]
	}
}];

Handlebars.registerHelper('join', function (p) {
	return p.join(", ")
});

Handlebars.registerHelper('prepLink', function (p) {
	var links = [];
	p.forEach(function (c) {
		var url = c.link,
			label = c.name;
		links.push("<a href='" + url + "' target='_blank'>" + label + "</a>");
	});
	return links;
});


function renderTemplate(zone) {
	if (!document.getElementById(zone.templateId)) return;
	const source = document.getElementById(zone.templateId).innerHTML;
	const template = Handlebars.compile(source);
	document.getElementById(zone.containerId).innerHTML = template(zone.context);
}

window.onload = function () {
	zones.forEach(renderTemplate);
	$(".copyright-year").text(new Date().getFullYear());

};