/* =====================================================
       DESTINATION DATABASE
    ===================================================== */

    let destinations = [

{
name:"Gulmarg",
state:"Jammu & Kashmir",
category:"Mountain",
image:"https://images.unsplash.com/photo-1518002054494-3a6f94352e9d",
description:"Snow-covered mountains, skiing and spectacular Himalayan scenery.",
bestTime:"December – March",
budget:"₹18,000",
rating:"4.9"
},

{
name:"Pahalgam",
state:"Jammu & Kashmir",
category:"Nature",
image:"https://images.unsplash.com/photo-1548013146-72479768bada",
description:"Beautiful valleys, rivers and peaceful Himalayan landscapes.",
bestTime:"April – October",
budget:"₹16,000",
rating:"4.8"
},

{
name:"Leh",
state:"Ladakh",
category:"Adventure",
image:"https://images.unsplash.com/photo-1581793745862-99fde7fa73d2",
description:"High-altitude deserts, monasteries and legendary mountain roads.",
bestTime:"May – September",
budget:"₹25,000",
rating:"4.9"
},

{
name:"Manali",
state:"Himachal Pradesh",
category:"Mountain",
image:"https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
description:"A Himalayan paradise for snow, trekking and adventure.",
bestTime:"October – June",
budget:"₹15,000",
rating:"4.8"
},

{
name:"Shimla",
state:"Himachal Pradesh",
category:"Mountain",
image:"https://images.unsplash.com/photo-1597074866923-dc0589150358",
description:"Colonial architecture, mountains and peaceful hill-station vibes.",
bestTime:"March – June",
budget:"₹13,000",
rating:"4.7"
},

{
name:"Amritsar",
state:"Punjab",
category:"Spiritual",
image:"https://images.unsplash.com/photo-1609948543911-7f0f5f0e4b8d",
description:"Home of the Golden Temple and rich Punjabi culture.",
bestTime:"October – March",
budget:"₹10,000",
rating:"4.8"
},

{
name:"Jaipur",
state:"Rajasthan",
category:"Heritage",
image:"https://images.unsplash.com/photo-1477587458883-47145ed94245",
description:"Royal palaces, forts and the colourful heritage of Rajasthan.",
bestTime:"October – March",
budget:"₹12,000",
rating:"4.8"
},

{
name:"Udaipur",
state:"Rajasthan",
category:"Heritage",
image:"https://images.unsplash.com/photo-1599661046289-e31897846e41",
description:"Lakes, royal palaces and one of India's most romantic cities.",
bestTime:"October – March",
budget:"₹15,000",
rating:"4.9"
},

{
name:"Jaisalmer",
state:"Rajasthan",
category:"Adventure",
image:"https://images.unsplash.com/photo-1477587458883-47145ed94245",
description:"Golden forts, desert safaris and unforgettable desert nights.",
bestTime:"November – February",
budget:"₹14,000",
rating:"4.8"
},

{
name:"Rishikesh",
state:"Uttarakhand",
category:"Adventure",
image:"https://images.unsplash.com/photo-1590050752117-23a9d57f6d8f",
description:"River rafting, yoga, spirituality and Himalayan adventures.",
bestTime:"September – November",
budget:"₹9,000",
rating:"4.8"
},

{
name:"Varanasi",
state:"Uttar Pradesh",
category:"Spiritual",
image:"https://images.unsplash.com/photo-1561361058-c24cecae35ca",
description:"Ancient ghats, spiritual traditions and the Ganga.",
bestTime:"October – March",
budget:"₹8,000",
rating:"4.8"
},

{
name:"Agra",
state:"Uttar Pradesh",
category:"Heritage",
image:"https://images.unsplash.com/photo-1564507592333-c60657eea523",
description:"Home of the iconic Taj Mahal and Mughal heritage.",
bestTime:"October – March",
budget:"₹8,000",
rating:"4.9"
},

{
name:"Goa",
state:"Goa",
category:"Beach",
image:"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
description:"Beaches, nightlife, Portuguese heritage and coastal adventures.",
bestTime:"November – February",
budget:"₹15,000",
rating:"4.7"
},

{
name:"Mumbai",
state:"Maharashtra",
category:"City",
image:"https://images.unsplash.com/photo-1570168007204-dfb528c6958f",
description:"India's energetic financial capital with food, culture and cinema.",
bestTime:"October – February",
budget:"₹12,000",
rating:"4.7"
},

{
name:"Pune",
state:"Maharashtra",
category:"Heritage",
image:"https://images.unsplash.com/photo-1595658658481-d53d3f999875",
description:"A modern educational city surrounded by historic forts and hills.",
bestTime:"October – February",
budget:"₹8,000",
rating:"4.6"
},

{
name:"Mahabaleshwar",
state:"Maharashtra",
category:"Nature",
image:"https://images.unsplash.com/photo-1626080308314-d7867b0c0b9d",
description:"Misty mountains, waterfalls, viewpoints and strawberry farms.",
bestTime:"October – June",
budget:"₹7,000",
rating:"4.7"
},

{
name:"Munnar",
state:"Kerala",
category:"Nature",
image:"https://images.unsplash.com/photo-1593693397690-362cb9666fc2",
description:"Endless tea plantations, misty hills and peaceful landscapes.",
bestTime:"September – March",
budget:"₹12,000",
rating:"4.8"
},

{
name:"Alleppey",
state:"Kerala",
category:"Nature",
image:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
description:"Experience Kerala's famous backwaters on a traditional houseboat.",
bestTime:"October – February",
budget:"₹15,000",
rating:"4.8"
},

{
name:"Ooty",
state:"Tamil Nadu",
category:"Nature",
image:"https://images.unsplash.com/photo-1593693411515-c20261bcad6e",
description:"Cool weather, tea gardens and beautiful Nilgiri landscapes.",
bestTime:"October – June",
budget:"₹10,000",
rating:"4.7"
},

{
name:"Coorg",
state:"Karnataka",
category:"Nature",
image:"https://images.unsplash.com/photo-1606298855672-3efb63017be8",
description:"Coffee plantations, forests and peaceful mountain scenery.",
bestTime:"October – March",
budget:"₹10,000",
rating:"4.7"
},

{
name:"Hampi",
state:"Karnataka",
category:"Heritage",
image:"https://images.unsplash.com/photo-1600100397608-f010e3a4f6a9",
description:"Ancient ruins and magnificent architecture of the Vijayanagara Empire.",
bestTime:"October – February",
budget:"₹9,000",
rating:"4.9"
},

{
name:"Mysore",
state:"Karnataka",
category:"Heritage",
image:"https://images.unsplash.com/photo-1596176530529-78163a4f7af2",
description:"Royal palaces, heritage architecture and famous cuisine.",
bestTime:"October – February",
budget:"₹9,000",
rating:"4.7"
},

{
name:"Kanyakumari",
state:"Tamil Nadu",
category:"Spiritual",
image:"https://images.unsplash.com/photo-1593693411515-c20261bcad6e",
description:"Where India's three great water bodies meet.",
bestTime:"October – March",
budget:"₹10,000",
rating:"4.6"
},

{
name:"Darjeeling",
state:"West Bengal",
category:"Mountain",
image:"https://images.unsplash.com/photo-1548013146-72479768bada",
description:"Tea gardens, Himalayan views and the famous toy train.",
bestTime:"March – May",
budget:"₹13,000",
rating:"4.8"
},

{
name:"Gangtok",
state:"Sikkim",
category:"Mountain",
image:"https://images.unsplash.com/photo-1544735716-392fe2489ffa",
description:"A beautiful Himalayan city surrounded by dramatic landscapes.",
bestTime:"March – May",
budget:"₹16,000",
rating:"4.8"
},

{
name:"Shillong",
state:"Meghalaya",
category:"Nature",
image:"https://images.unsplash.com/photo-1596402184320-417e7178b2cd",
description:"Waterfalls, forests and the beautiful hills of Meghalaya.",
bestTime:"October – April",
budget:"₹14,000",
rating:"4.7"
},

{
name:"Cherrapunji",
state:"Meghalaya",
category:"Nature",
image:"https://images.unsplash.com/photo-1605640840605-14ac1855827b",
description:"Waterfalls, living root bridges and dramatic green valleys.",
bestTime:"October – April",
budget:"₹14,000",
rating:"4.8"
},

{
name:"Tawang",
state:"Arunachal Pradesh",
category:"Adventure",
image:"https://images.unsplash.com/photo-1544735716-392fe2489ffa",
description:"Remote Himalayan landscapes, monasteries and mountain passes.",
bestTime:"March – October",
budget:"₹20,000",
rating:"4.9"
},

{
name:"Kaziranga",
state:"Assam",
category:"Nature",
image:"https://images.unsplash.com/photo-1535338454770-8be927b5a00b",
description:"Famous wildlife sanctuary known for the one-horned rhinoceros.",
bestTime:"November – April",
budget:"₹12,000",
rating:"4.8"
},

{
name:"Andaman",
state:"Andaman & Nicobar",
category:"Beach",
image:"https://images.unsplash.com/photo-1540202404-a2f29016b523",
description:"Crystal-clear waters, coral reefs and tropical islands.",
bestTime:"October – May",
budget:"₹25,000",
rating:"4.9"
}

];

function getDefaultFacilities(category) {
    const categoryKey = (category || "Nature").toLowerCase();

    const facilityMap = {
        mountain: {
            cab: ["Airport cab", "Local taxi", "Mountain transfer"],
            stay: ["Hostel", "Guest house", "Hill resort"]
        },
        beach: {
            cab: ["Airport cab", "Beach taxi", "Bike rental"],
            stay: ["Hostel", "Guest room", "Beach resort"]
        },
        heritage: {
            cab: ["City cab", "Tour taxi", "Private transfer"],
            stay: ["Heritage stay", "Guest room", "Budget hotel"]
        },
        nature: {
            cab: ["Local cab", "Forest route taxi", "Private transfer"],
            stay: ["Eco hostel", "Guest house", "Nature lodge"]
        },
        spiritual: {
            cab: ["Temple cab", "Local taxi", "Rail pickup"],
            stay: ["Dharmshala", "Guest room", "Budget stay"]
        },
        adventure: {
            cab: ["Adventure cab", "SUV transfer", "Local taxi"],
            stay: ["Backpacker hostel", "Guest house", "Adventure lodge"]
        }
    };

    return facilityMap[categoryKey] || {
        cab: ["Airport cab", "Local taxi", "Private transfer"],
        stay: ["Hostel", "Guest room", "Budget stay"]
    };
}

function applyDestinationFacilities(destination) {
    const base = getDefaultFacilities(destination.category);
    destination.cabOptions = destination.cabOptions || base.cab;
    destination.stayOptions = destination.stayOptions || base.stay;
    return destination;
}

destinations.forEach(applyDestinationFacilities);

const API_BASE = "/api";
let serverTripId = null;
let apiAvailable = false;
let adventurePackages = [];
let testPaymentConfigured = false;
let bookingEmailConfigured = false;
let selectedAdventure = null;

async function loadBackendData(){
    try{
        const [destinationResponse, tripResponse] = await Promise.all([
            fetch(`${API_BASE}/destinations`),
            fetch(`${API_BASE}/trips`)
        ]);

        if(!destinationResponse.ok || !tripResponse.ok) throw new Error("Backend unavailable");

        const destinationData = await destinationResponse.json();
        const tripData = await tripResponse.json();

        if(Array.isArray(destinationData.destinations) && destinationData.destinations.length){
            destinations = destinationData.destinations.map(applyDestinationFacilities);
            renderDestinations(destinations);
        }
        populateTripDestinationPicker();

        const savedTrip = Array.isArray(tripData.trips) ? tripData.trips.at(-1) : null;
        if(savedTrip){
            serverTripId = savedTrip.id;
            trip = Array.isArray(savedTrip.destinations) ? savedTrip.destinations : [];
            tripDetails = savedTrip.details || {};
            saveTripLocally();
            localStorage.setItem("bharatyatra-trip-details", JSON.stringify(tripDetails));
            updateTrip();
        }

        apiAvailable = true;
    }catch(error){
        console.warn("Bharatyatra backend is unavailable; using local browser data.", error);
    }
}

async function persistTrip(){
    if(!apiAvailable) return;

    const payload = {
        name: tripDetails.name || "My Bharatyatra Trip",
        destinations: trip,
        details: tripDetails
    };
    const endpoint = serverTripId ? `${API_BASE}/trips/${serverTripId}` : `${API_BASE}/trips`;
    const response = await fetch(endpoint, {
        method: serverTripId ? "PUT" : "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(payload)
    });

    if(!response.ok) throw new Error("Trip could not be saved to the backend.");

    const result = await response.json();
    serverTripId = result.trip?.id || serverTripId;
}

async function loadAdventurePackages(){
    const list=document.getElementById("modalAdventureList");
    try{
        const response=await fetch(`${API_BASE}/adventures`);
        if(!response.ok) throw new Error("Adventure packages could not be loaded.");
        const result=await response.json();
        adventurePackages=Array.isArray(result.packages)?result.packages:[];
        testPaymentConfigured=result.paymentConfigured===true;
        bookingEmailConfigured=result.emailConfigured===true;
        if(selectedPlace) renderDestinationAdventures(selectedPlace.name);
    }catch(error){
        console.error("Adventure package loading failed:",error);
        list.textContent="Adventure packages are temporarily unavailable. Please try again later.";
    }
}

loadBackendData();
loadAdventurePackages();

/* =====================================================
   HERO SLIDES
===================================================== */

const heroSlides = [

{
title:"Kashmir",
tag:"🏔 Paradise on Earth",
description:"Snow-covered mountains, crystal lakes and valleys that look like they belong in a dream.",
image:"https://images.unsplash.com/photo-1518002054494-3a6f94352e9d"
},

{
title:"Ladakh",
tag:"⛰️ Land of High Passes",
description:"Ride through some of India's most dramatic landscapes where mountains meet the sky.",
image:"https://images.unsplash.com/photo-1581793745862-99fde7fa73d2"
},

{
title:"Kerala",
tag:"🌴 God's Own Country",
description:"Drift through peaceful backwaters, tropical forests and lush tea plantations.",
image:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944"
},

{
title:"Rajasthan",
tag:"🏜️ The Land of Kings",
description:"Walk through golden forts, royal palaces and endless desert landscapes.",
image:"https://images.unsplash.com/photo-1477587458883-47145ed94245"
},

{
title:"Andaman",
tag:"🌊 Island Escape",
description:"Discover turquoise waters, coral reefs and India's tropical island paradise.",
image:"https://images.unsplash.com/photo-1540202404-a2f29016b523"
},

{
title:"Meghalaya",
tag:"🌿 Abode of Clouds",
description:"Explore waterfalls, misty hills and living root bridges hidden in Northeast India.",
image:"https://images.unsplash.com/photo-1605640840605-14ac1855827b"
}

];

let heroIndex=0;
let activeHero=1;


/* =====================================================
   HERO ENGINE
===================================================== */

const img1=document.getElementById("heroImage1");
const img2=document.getElementById("heroImage2");

function setupHero(){

    document.getElementById("heroDots").innerHTML="";

    heroSlides.forEach((_,i)=>{

        const dot=document.createElement("div");

        dot.className="hero-dot";

        if(i===0) dot.classList.add("active");

        dot.onclick=()=>{
            heroIndex=i;
            changeHero();
        };

        document
            .getElementById("heroDots")
            .appendChild(dot);

    });

    img1.src=heroSlides[0].image;
}

function changeHero(){

    const slide=heroSlides[heroIndex];

    const incoming=activeHero===1?img2:img1;
    const outgoing=activeHero===1?img1:img2;

    incoming.src=slide.image;

    incoming.classList.add("show");
    outgoing.classList.remove("show");

    activeHero=activeHero===1?2:1;

    document.getElementById("heroTitle").textContent=
        slide.title;

    document.getElementById("heroTag").textContent=
        slide.tag;

    document.getElementById("heroDescription").textContent=
        slide.description;

    document.querySelectorAll(".hero-dot")
        .forEach((dot,i)=>{
            dot.classList.toggle(
                "active",
                i===heroIndex
            );
        });

    heroIndex++;

    if(heroIndex>=heroSlides.length){
        heroIndex=0;
    }
}

setupHero();

setInterval(changeHero,5500);


/* =====================================================
   RENDER DESTINATIONS
===================================================== */

let currentCategory="All";

function renderDestinations(data){

    const grid=
        document.getElementById("destinationGrid");

    grid.innerHTML="";

    document.getElementById("resultCount")
        .textContent=data.length+" places";

    if(data.length===0){

        grid.innerHTML=`
            <div style="padding:40px;color:var(--muted)">
                No destination found.
            </div>
        `;

        return;
    }

    data.forEach((place,index)=>{

        const card=document.createElement("article");

        card.className="destination";

        const liked=
            JSON.parse(
                localStorage.getItem(
                    "bharatyatra-favorites"
                )||"[]"
            ).includes(place.name);

        card.innerHTML=`

            <div class="destination-img">

                <img
                    src="${place.image}"
                    loading="lazy"
                    alt="${place.name}"
                >

                <button
                    class="heart"
                    onclick="toggleFavorite('${place.name}')"
                >
                    ${liked?"❤️":"♡"}
                </button>

            </div>

            <div class="destination-info">

                <h3>${place.name}</h3>

                <div class="location">
                    📍 ${place.state}
                </div>

                <p>
                    ${place.description}
                </p>

                <div class="card-footer">

                    <span class="rating">
                        ⭐ ${place.rating}
                    </span>

                    <button
                        class="explore"
                        onclick="openDestination(${index})"
                    >
                        Explore
                    </button>

                </div>

            </div>
        `;

        /*
          We need original object index rather than
          filtered array index.
        */

        card.querySelector(".explore")
            .onclick=()=>openDestination(
                destinations.indexOf(place)
            );

        grid.appendChild(card);

    });
}

renderDestinations(destinations);


/* =====================================================
   CATEGORY FILTER
===================================================== */

function filterCategory(category){

    currentCategory=category;

    document.querySelectorAll(".category")
        .forEach(btn=>{

            btn.classList.toggle(
                "active",
                btn.textContent
                    .toLowerCase()
                    .includes(category.toLowerCase())
            );

        });

    const search=
        document.getElementById("search")
            .value.toLowerCase();

    let data=destinations;

    if(category!=="All"){
        data=data.filter(
            x=>x.category===category
        );
    }

    if(search){
        data=data.filter(x=>
            x.name.toLowerCase().includes(search) ||
            x.state.toLowerCase().includes(search)
        );
    }

    renderDestinations(data);

    scrollToExplore();
}


/* =====================================================
   SEARCH
===================================================== */

document.getElementById("search")
.addEventListener("input",function(){

    const query=this.value.toLowerCase();

    let data=destinations;

    if(currentCategory!=="All"){
        data=data.filter(
            x=>x.category===currentCategory
        );
    }

    data=data.filter(x=>
        x.name.toLowerCase().includes(query) ||
        x.state.toLowerCase().includes(query)
    );

    renderDestinations(data);
});


/* =====================================================
   DESTINATION MODAL
===================================================== */

let selectedPlace=null;

function openDestination(index){

    selectedPlace=applyDestinationFacilities(destinations[index]);

    document.getElementById("modalImage").src=
        selectedPlace.image;

    document.getElementById("modalTitle").textContent=
        selectedPlace.name;

    document.getElementById("modalDescription").textContent=
        selectedPlace.description;

    document.getElementById("modalLocation").textContent=
        selectedPlace.state;

    document.getElementById("modalTime").textContent=
        selectedPlace.bestTime;

    document.getElementById("modalBudget").textContent=
        selectedPlace.budget;

    document.getElementById("modalRating").textContent=
        "⭐ "+selectedPlace.rating;

    document.getElementById("modalCategory").textContent=
        selectedPlace.category;

    document.getElementById("modalCabOptions").innerHTML=
        selectedPlace.cabOptions.map(item=>`<span class="facility-tag">${item}</span>`).join("");

    document.getElementById("modalStayOptions").innerHTML=
        selectedPlace.stayOptions.map(item=>`<span class="facility-tag">${item}</span>`).join("");

    renderDestinationAdventures(selectedPlace.name);

    document.getElementById("modal")
        .classList.add("show");

}

function renderDestinationAdventures(destinationName){
    const list=document.getElementById("modalAdventureList");
    const packages=adventurePackages.filter(item=>item.destination===destinationName);
    list.replaceChildren();
    if(!packages.length){
        list.textContent="Loading safe local experience suggestions...";
        return;
    }
    packages.forEach(adventure=>{
        const card=document.createElement("article");
        card.className="adventure-card";
        const heading=document.createElement("h4");
        heading.textContent=adventure.name;
        const description=document.createElement("p");
        description.textContent=adventure.description;
        const footer=document.createElement("div");
        footer.className="adventure-card-footer";
        const price=document.createElement("strong");
        price.textContent=`Sample: Rs. ${adventure.unitPrice.toLocaleString("en-IN")} / person`;
        const button=document.createElement("button");
        button.type="button";
        button.className="adventure-book-button";
        button.textContent=testPaymentConfigured?"Book test package":"Test checkout not configured";
        button.disabled=!testPaymentConfigured;
        button.addEventListener("click",()=>openAdventureBooking(adventure.id));
        footer.append(price,button);
        card.append(heading,description,footer);
        list.appendChild(card);
    });
}

function setBookingNotice(message,isError=false){
    const notice=document.getElementById("bookingNotice");
    notice.textContent=message;
    notice.classList.add("visible");
    notice.style.color=isError?"#b42318":"";
}

function openAdventureBooking(packageId){
    selectedAdventure=adventurePackages.find(item=>item.id===packageId)||null;
    if(!selectedAdventure) return;
    document.getElementById("bookingPackageSummary").textContent=
        `${selectedAdventure.name} · ${selectedAdventure.destination} · Rs. ${selectedAdventure.unitPrice.toLocaleString("en-IN")} / person`;
    const modal=document.getElementById("adventureBookingModal");
    const form=document.getElementById("adventureBookingForm");
    form.reset();
    form.elements.participants.value="1";
    form.elements.activityDate.min=new Date().toISOString().slice(0,10);
    const maxDate=new Date();
    maxDate.setUTCDate(maxDate.getUTCDate()+365);
    form.elements.activityDate.max=maxDate.toISOString().slice(0,10);
    const button=document.getElementById("adventureBookingSubmit");
    button.disabled=!testPaymentConfigured;
    setBookingNotice(testPaymentConfigured
        ? (bookingEmailConfigured
            ? "Razorpay TEST checkout is configured. Sample prices only; no real money is collected and no activity is reserved."
            : "Razorpay TEST checkout is configured. Confirmation email is not configured yet; no real money is collected.")
        : "Test checkout is not configured on the server. No real payment can be taken.",!testPaymentConfigured);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden","false");
}

function closeAdventureBooking(){
    const modal=document.getElementById("adventureBookingModal");
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden","true");
}

document.getElementById("closeAdventureBooking")
    .addEventListener("click",closeAdventureBooking);

document.getElementById("adventureBookingModal")
    .addEventListener("click",event=>{
        if(event.target.id==="adventureBookingModal") closeAdventureBooking();
    });

document.getElementById("adventureBookingForm")
    .addEventListener("submit",async event=>{
        event.preventDefault();
        if(!selectedAdventure||!testPaymentConfigured) return;
        if(typeof window.Razorpay!=="function"){
            setBookingNotice("Razorpay checkout did not load. Check your connection and try again.",true);
            return;
        }
        const form=event.currentTarget;
        const submit=document.getElementById("adventureBookingSubmit");
        const payload={
            packageId:selectedAdventure.id,
            name:form.elements.name.value.trim(),
            email:form.elements.email.value.trim(),
            phone:form.elements.phone.value.trim(),
            activityDate:form.elements.activityDate.value,
            participants:Number(form.elements.participants.value)
        };
        submit.disabled=true;
        setBookingNotice("Creating a secure Razorpay test order...");
        try{
            const response=await fetch(`${API_BASE}/bookings/order`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(payload)
            });
            const order=await response.json();
            if(!response.ok) throw new Error(order.error||"Test order could not be created.");
            const checkout=new window.Razorpay({
                key:order.keyId,
                amount:order.amount,
                currency:order.currency,
                name:"Bharatyatra (Test)",
                description:`${order.packageName} · ${payload.participants} participant(s)`,
                order_id:order.orderId,
                prefill:{name:payload.name,email:payload.email,contact:payload.phone},
                notes:{booking_id:order.bookingId},
                theme:{color:"#ff6b2c"},
                handler:async payment=>{
                    setBookingNotice("Verifying the test payment...");
                    try{
                        const verification=await fetch(`${API_BASE}/bookings/verify`,{
                            method:"POST",
                            headers:{"Content-Type":"application/json"},
                            body:JSON.stringify({
                                bookingId:order.bookingId,
                                orderId:payment.razorpay_order_id,
                                paymentId:payment.razorpay_payment_id,
                                signature:payment.razorpay_signature
                            })
                        });
                        const result=await verification.json();
                        if(!verification.ok||!result.paid) throw new Error(result.error||"Test payment verification failed.");
                        setBookingNotice(result.emailSent
                            ? `Test payment verified. Confirmation sent to ${payload.email}. This is not a real booking.`
                            : "Test payment verified, but confirmation email is not configured. This is not a real booking.",!result.emailSent);
                    }catch(error){
                        setBookingNotice(error.message,true);
                    }finally{
                        submit.disabled=false;
                    }
                },
                modal:{ondismiss:()=>{
                    setBookingNotice("Test checkout was closed. No booking was confirmed.");
                    submit.disabled=false;
                }}
            });
            checkout.open();
        }catch(error){
            setBookingNotice(error.message,true);
            submit.disabled=false;
        }
    });

function closeModal(){

    document.getElementById("modal")
        .classList.remove("show");

}

document.getElementById("modal")
.addEventListener("click",function(e){

    if(e.target===this){
        closeModal();
    }

});


/* =====================================================
   FAVORITES
===================================================== */

function getFavorites(){

    return JSON.parse(
        localStorage.getItem(
            "bharatyatra-favorites"
        )||"[]"
    );

}

function toggleFavorite(name){

    let favorites=getFavorites();

    if(favorites.includes(name)){

        favorites=
            favorites.filter(x=>x!==name);

        toast("Removed from favorites");

    }else{

        favorites.push(name);

        toast("❤️ Added to favorites");

    }

    localStorage.setItem(
        "bharatyatra-favorites",
        JSON.stringify(favorites)
    );

    renderDestinations(
        currentCategory==="All"
        ?destinations
        :destinations.filter(
            x=>x.category===currentCategory
        )
    );
}

function showFavorites(){

    const favorites=getFavorites();

    const data=
        destinations.filter(
            x=>favorites.includes(x.name)
        );

    renderDestinations(data);

    toast(
        favorites.length+
        " favorite destination(s)"
    );

    scrollToExplore();
}


/* =====================================================
   TRIP PLANNER
===================================================== */

let trip=JSON.parse(
    localStorage.getItem(
        "bharatyatra-trip"
    )||"[]"
);

let tripDetails=JSON.parse(
    localStorage.getItem("bharatyatra-trip-details")||"{}"
);

populateTripDestinationPicker();

function addToTrip(place){

    if(!trip.some(x=>x.name===place.name)){

        trip.push(place);
        const hadItinerary=clearTripItineraryForDestinationChange();

        saveTrip();

        toast(hadItinerary
            ? `${place.name} added. Rebuild your itinerary to include it.`
            : `🧳 ${place.name} added to your trip`);

        updateTrip();

    }else{

        toast("Already in your trip");

    }
}

document.getElementById("addTripBtn")
.onclick=()=>{
    if(selectedPlace){
        addToTrip(selectedPlace);
    }
};

function saveTrip(){

    saveTripLocally();
    persistTrip().catch(error=>console.warn(error.message));

}

function saveTripLocally(){

    localStorage.setItem(
        "bharatyatra-trip",
        JSON.stringify(trip)
    );

}

function clearTripItineraryForDestinationChange(){
    if(!Array.isArray(tripDetails.itinerary)||!tripDetails.itinerary.length) return false;
    tripDetails.itinerary=[];
    localStorage.setItem("bharatyatra-trip-details",JSON.stringify(tripDetails));
    return true;
}

function saveTripDetails(){
    const start=document.getElementById("tripStart").value;
    const end=document.getElementById("tripEnd").value;

    if(!trip.length){
        toast("Add at least one destination to build your itinerary");
        return;
    }

    if(!start||!end){
        toast("Choose your trip start and end dates");
        return;
    }

    if(start&&end&&end<start){
        toast("End date must be after start date");
        return;
    }

    const days=getTripDayCount(start,end);
    if(days>30){
        toast("For a clear itinerary, choose a trip of 30 days or less");
        return;
    }

    tripDetails={
        name:document.getElementById("tripName").value.trim(),
        start:start,
        end:end,
        travellers:document.getElementById("tripTravellers").value,
        budget:document.getElementById("tripBudget").value,
        transport:document.getElementById("tripTransport").value,
        notes:document.getElementById("tripNotes").value.trim(),
        itinerary:buildTripItinerary(start,end)
    };
    if(!tripDetails.name){
        tripDetails.name=`${trip[0].name} trip`;
        document.getElementById("tripName").value=tripDetails.name;
    }
    localStorage.setItem("bharatyatra-trip-details",JSON.stringify(tripDetails));
    updateTrip();
    persistTrip().catch(error=>toast(error.message));
    toast("Your day-wise itinerary is ready");
}

function loadTripDetails(){
    Object.entries({
        tripName:tripDetails.name||"",
        tripStart:tripDetails.start||"",
        tripEnd:tripDetails.end||"",
        tripTravellers:tripDetails.travellers||2,
        tripBudget:tripDetails.budget||"",
        tripTransport:tripDetails.transport||"Any",
        tripNotes:tripDetails.notes||""
    }).forEach(([id,value])=>document.getElementById(id).value=value);
}

function getTripDays(){
    if(!tripDetails.start||!tripDetails.end) return "-";
    const days=getTripDayCount(tripDetails.start,tripDetails.end);
    return days>0?days:"-";
}

function getTripDayCount(start,end){
    const startParts=start.split("-").map(Number);
    const endParts=end.split("-").map(Number);
    const first=Date.UTC(startParts[0],startParts[1]-1,startParts[2]);
    const last=Date.UTC(endParts[0],endParts[1]-1,endParts[2]);
    return Math.floor((last-first)/86400000)+1;
}

function populateTripDestinationPicker(){
    const picker=document.getElementById("tripDestinationPicker");
    if(!picker) return;
    const selected=picker.value;
    picker.replaceChildren(new Option("Choose from India",""));
    destinations.forEach(place=>picker.add(new Option(`${place.name} · ${place.state}`,place.name)));
    if(destinations.some(place=>place.name===selected)) picker.value=selected;
    renderTripSelectedDestinations();
}

function renderTripSelectedDestinations(){
    const selected=document.getElementById("tripSelectedDestinations");
    selected.replaceChildren();
    if(!trip.length){
        selected.textContent="Choose and add at least one place to start building your itinerary.";
        selected.style.color="var(--muted)";
        selected.style.fontSize="12px";
        return;
    }
    selected.style.color="";
    selected.style.fontSize="";
    trip.forEach(place=>{
        const chip=document.createElement("span");
        chip.className="trip-selected-destination";
        chip.textContent=place.name;
        selected.appendChild(chip);
    });
}

function buildTripItinerary(start,end){
    const activities={
        Mountain:[
            ["Arrive, check in and take it easy","Explore the town centre and nearby viewpoints","Enjoy sunset views; have dinner close to your stay"],
            ["Start with a scenic viewpoint","Explore a nearby valley, lake or local trail","Try a local cafe and plan tomorrow's route"],
            ["Choose a gentle nature walk or local experience","Keep time for a relaxed lunch and rest","Visit a market or catch the evening view"]
        ],
        Beach:[
            ["Arrive, check in and explore the nearby area","Relax by the beach and find a local lunch spot","Catch sunset by the shore"],
            ["Start with a beach walk","Choose a water activity or coastal sightseeing","Enjoy a relaxed evening and local food"],
            ["Explore another nearby beach or viewpoint","Take a break during the warmest hours","Visit a local market or waterfront"]
        ],
        Heritage:[
            ["Arrive and take an easy old-town walk","Visit a nearby landmark or museum","Try local food and explore the evening market"],
            ["Visit a major fort, palace or heritage site","Explore the surrounding neighbourhood","Enjoy a local food stop and rest"],
            ["Choose a museum or guided heritage walk","Leave time for shopping and a relaxed lunch","Visit a nearby evening landmark"]
        ],
        Nature:[
            ["Arrive, check in and explore nearby nature","Visit a local garden, waterfall or viewpoint","Enjoy a quiet evening and local food"],
            ["Start early for a nature trail or tea garden","Take a relaxed lunch and rest","Choose a nearby sunset point"],
            ["Explore a second nature spot at an easy pace","Keep time for local food and photos","Relax near your stay"]
        ],
        Spiritual:[
            ["Arrive and settle in","Visit a nearby temple, ghat or spiritual site","Take a quiet evening walk and try local food"],
            ["Visit the main spiritual site early","Explore the surrounding heritage area","Keep the evening relaxed"],
            ["Choose a nearby place of interest","Take a break and enjoy local cuisine","Attend an evening ceremony if available"]
        ],
        Adventure:[
            ["Arrive, check in and confirm activity timings","Explore the local area and prepare for tomorrow","Rest early and check weather conditions"],
            ["Start your main outdoor activity early","Take a proper lunch and recovery break","Choose an easy evening activity"],
            ["Try a second guided activity or scenic route","Keep a flexible rest window","Enjoy a relaxed local evening"]
        ]
    };
    const startDate=new Date(`${start}T00:00:00Z`);
    const days=getTripDayCount(start,end);
    const travellers=Math.max(1,Number(document.getElementById("tripTravellers").value)||1);
    const budget=Number(document.getElementById("tripBudget").value)||0;

    return Array.from({length:days},(_,index)=>{
        const date=new Date(startDate);
        date.setUTCDate(date.getUTCDate()+index);
        const place=trip[Math.min(trip.length-1,Math.floor(index*trip.length/days))];
        const plan=activities[place.category]||activities.Nature;
        const dayPlan=plan[Math.min(index%plan.length,plan.length-1)];
        const totalDailyBudget=budget?Math.round(budget/days):0;

        return {
            date:date.toISOString().slice(0,10),
            destination:place.name,
            morning:dayPlan[0],
            afternoon:dayPlan[1],
            evening:dayPlan[2],
            dailyBudget:totalDailyBudget,
            travellers
        };
    });
}

function renderTripItinerary(){
    const section=document.getElementById("tripItinerarySection");
    const list=document.getElementById("tripItinerary");
    const saveButton=document.getElementById("saveItineraryEdits");
    const itinerary=Array.isArray(tripDetails.itinerary)?tripDetails.itinerary:[];
    section.hidden=itinerary.length===0;
    list.replaceChildren();
    saveButton.hidden=true;
    itinerary.forEach((day,index)=>{
        const card=document.createElement("article");
        card.className="trip-day-card";
        const heading=document.createElement("div");
        heading.className="trip-day-heading";
        const title=document.createElement("strong");
        title.textContent=`Day ${index+1} · ${day.destination}`;
        const date=document.createElement("small");
        date.textContent=new Date(`${day.date}T00:00:00`).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
        heading.append(title,date);
        card.appendChild(heading);

        [["morning","Morning"],["afternoon","Afternoon"],["evening","Evening"]].forEach(([key,label])=>{
            const activity=document.createElement("div");
            activity.className="trip-day-activity";
            const activityLabel=document.createElement("label");
            activityLabel.textContent=label;
            const input=document.createElement("textarea");
            input.value=day[key]||"";
            input.setAttribute("aria-label",`${label} activity for day ${index+1}`);
            input.addEventListener("input",()=>{day[key]=input.value;saveButton.hidden=false;});
            activity.append(activityLabel,input);
            card.appendChild(activity);
        });

        if(day.dailyBudget){
            const dailyBudget=document.createElement("p");
            dailyBudget.className="trip-day-budget";
            const perPerson=Math.round(day.dailyBudget/Math.max(1,Number(day.travellers)||1));
            const stay=Math.round(day.dailyBudget*0.4);
            const meals=Math.round(day.dailyBudget*0.25);
            const localTravel=Math.round(day.dailyBudget*0.2);
            const activities=day.dailyBudget-stay-meals-localTravel;
            dailyBudget.textContent=`Rough budget: Rs. ${day.dailyBudget.toLocaleString("en-IN")}/day total (about Rs. ${perPerson.toLocaleString("en-IN")} per traveller). Split: stay Rs. ${stay.toLocaleString("en-IN")}, meals Rs. ${meals.toLocaleString("en-IN")}, local travel Rs. ${localTravel.toLocaleString("en-IN")}, activities Rs. ${activities.toLocaleString("en-IN")}.`;
            card.appendChild(dailyBudget);
        }else{
            const dailyBudget=document.createElement("p");
            dailyBudget.className="trip-day-budget";
            dailyBudget.textContent="Add a total budget above to see a rough daily budget guide.";
            card.appendChild(dailyBudget);
        }
        list.appendChild(card);
    });
}

document.getElementById("addTripDestination").addEventListener("click",()=>{
    const picker=document.getElementById("tripDestinationPicker");
    const place=destinations.find(destination=>destination.name===picker.value);
    if(!place){
        toast("Choose a destination first");
        return;
    }
    addToTrip(place);
    renderTripSelectedDestinations();
    picker.value="";
});

document.getElementById("saveItineraryEdits").addEventListener("click",()=>{
    tripDetails.itinerary=tripDetails.itinerary||[];
    localStorage.setItem("bharatyatra-trip-details",JSON.stringify(tripDetails));
    persistTrip().catch(error=>toast(error.message));
    document.getElementById("saveItineraryEdits").hidden=true;
    toast("Itinerary edits saved");
});

function updateTrip(){

    const list=
        document.getElementById("tripList");

    renderTripSelectedDestinations();
    renderTripItinerary();
    document.getElementById("tripSummary").innerHTML=`
        <div><strong>${trip.length}</strong><small>places</small></div>
        <div><strong>${getTripDays()}</strong><small>days</small></div>
        <div><strong>${tripDetails.travellers||0}</strong><small>travellers</small></div>
    `;

    document.getElementById("tripMeta").textContent=[
        tripDetails.name||"Untitled trip",
        tripDetails.budget?`Rs. ${tripDetails.budget} budget`:"Budget not set",
        tripDetails.transport?`${tripDetails.transport} travel`:"Transport not set",
        tripDetails.notes||"No extra notes"
    ].join(" · ");

    if(trip.length===0){

        list.innerHTML=`
            <p style="margin-top:30px;color:var(--muted)">
                Your trip is empty.
                Explore India and add places here.
            </p>
        `;

        return;
    }

    list.innerHTML="";

    trip.forEach((place,index)=>{

        const item=document.createElement("div");

        item.className="trip-item";

        item.innerHTML=`

            <img src="${place.image}">

            <div style="flex:1">
                <strong>${place.name}</strong>
                <small style="display:block;color:var(--muted)">
                    ${place.state}
                </small>
            </div>

            <button
                onclick="removeTrip(${index})"
                style="
                    border:0;
                    background:none;
                    cursor:pointer;
                "
            >
                ✕
            </button>
        `;

        list.appendChild(item);

    });

}

function removeTrip(index){

    trip.splice(index,1);
    const hadItinerary=clearTripItineraryForDestinationChange();

    saveTrip();

    updateTrip();
    if(hadItinerary) toast("Destination removed. Rebuild your itinerary to update it.");

}

function openTrip(){

    loadTripDetails();
    updateTrip();

    document.getElementById("tripPanel")
        .classList.add("open");

}

document.getElementById("tripForm")
.addEventListener("submit",function(event){
    event.preventDefault();
    saveTripDetails();
});

function closeTrip(){

    document.getElementById("tripPanel")
        .classList.remove("open");

}


/* =====================================================
   RECOMMENDATION
===================================================== */

function recommend(){

    const categories=[
        "Mountain",
        "Beach",
        "Heritage",
        "Nature",
        "Spiritual",
        "Adventure"
    ];

    const selected=
        prompt(
            "What kind of trip do you want?\n\n"+
            "Mountain / Beach / Heritage / Nature / Spiritual / Adventure"
        );

    if(!selected) return;

    const match=
        categories.find(
            x=>x.toLowerCase()===
            selected.toLowerCase()
        );

    if(!match){

        toast("Please choose a listed category");

        return;
    }

    filterCategory(match);

    toast(
        "✨ We found your destinations!"
    );

}

function surpriseDestination(){
    if(!destinations.length) return;

    const selectedIndex=Math.floor(Math.random()*destinations.length);
    openDestination(selectedIndex);
    toast("🎲 Your surprise destination is ready");
}


/* =====================================================
   DARK MODE
===================================================== */

function toggleDark(){

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "bharatyatra-dark",
        document.body.classList.contains("dark")
    );

}

if(
    localStorage.getItem(
        "bharatyatra-dark"
    )==="true"
){

    document.body.classList.add("dark");

}


/* =====================================================
   LANGUAGE
===================================================== */

let hindi=false;

function toggleLanguage(){

    hindi=!hindi;

    if(hindi){

        document.querySelector(".logo")
            .innerHTML=
            "BHARAT<span>YATRA.</span>";

        document.querySelector(
            ".section-heading h2"
        ).textContent=
            "भारत की खोज करें";

        document.querySelector(
            ".section-heading p"
        ).textContent=
            "भारत के अद्भुत स्थानों की खोज करें।";

        document.getElementById("search")
            .placeholder=
            "भारतीय पर्यटन स्थल खोजें...";

        toast("🇮🇳 हिन्दी मोड");

    }else{

        document.querySelector(
            ".section-heading h2"
        ).textContent=
            "Discover India";

        document.querySelector(
            ".section-heading p"
        ).textContent=
            "Handpicked places across the country.";

        document.getElementById("search")
            .placeholder=
            "Search Indian destinations...";

        toast("🌐 English mode");

    }

}


/* =====================================================
   MOBILE SIDEBAR
===================================================== */

document.getElementById("mobileMenu")
.onclick=()=>{

    document.getElementById("sidebar")
        .classList.toggle("open");

};


/* =====================================================
   HOME
===================================================== */

function showHome(){

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

function scrollToExplore(){

    document.getElementById("destinationGrid")
        .scrollIntoView({
            behavior:"smooth",
            block:"start"
        });

}


/* =====================================================
   TOAST
===================================================== */

let toastTimer;

function toast(message){

    const box=
        document.getElementById("toast");

    box.textContent=message;

    box.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer=setTimeout(()=>{
        box.classList.remove("show");
    },2200);

}

function openAiPanel(){

    document.getElementById("aiPanel")
        .classList.add("open");

    document.getElementById("aiInput")
        .focus();

}

function closeAiPanel(){

    document.getElementById("aiPanel")
        .classList.remove("open");

}

function addAiMessage(message,type){

    const item=document.createElement("div");

    item.className="ai-message "+type;
    item.textContent=message;

    document.getElementById("aiMessages")
        .appendChild(item);

    item.scrollIntoView({behavior:"smooth",block:"end"});

}

document.getElementById("aiForm")
.addEventListener("submit",async function(event){

    event.preventDefault();

    const input=document.getElementById("aiInput");
    const message=input.value.trim();

    if(!message) return;

    addAiMessage(message,"user");
    input.value="";
    input.disabled=true;

    try{

        const aiEndpoint="/api/ai";

        const response=await fetch(aiEndpoint,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({message})
        });

        const rawResponse=await response.text();
        let result;

        try{
            result=JSON.parse(rawResponse);
        }catch{
            throw new Error("Server ne valid response nahi bheja. Website ko backend ke saath open karein.");
        }

        if(!response.ok){
            throw new Error(result.error||"AI request failed");
        }

        addAiMessage(result.answer,"assistant");

    }catch(error){

        addAiMessage(error.message,"assistant");

    }finally{

        input.disabled=false;
        input.focus();

    }

});
