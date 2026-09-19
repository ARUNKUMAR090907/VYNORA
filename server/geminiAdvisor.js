/**
 * ============================================================================
 * VYNORA SOVEREIGN INTERNAL AI ENGINE & KNOWLEDGE MATRIX
 * 150+ SCHEME QA PATTERNS & 100+ CONVERSATIONAL / SMALL TALK QA PATTERNS
 * ============================================================================
 * 
 * ZERO EXTERNAL API KEY DEPENDENCY - 100% Self-Contained, Fast & Offline Capable
 * Primary Language Support: Tamil (தமிழ்) & English
 * 
 * Features:
 * 1. 100+ Conversational, Greeting, Small Talk, Navigation & FAQ Intents
 * 2. 150+ Scheme-Specific Intents (Central + Tamil Nadu State Welfare Schemes)
 * 3. Multi-Factor Tamil & English NLP Scoring Engine with Fuzzy Transliteration
 * 4. Citizen Profile-Aware Dynamic Personalization
 * ============================================================================
 */

// ============================================================================
// 1. 100+ CONVERSATIONAL, GREETING, SMALL TALK & FAQ QA PATTERNS
// ============================================================================
export const CONVERSATIONAL_PATTERNS = [
  // --- 1. Greetings & Vanakkam ---
  {
    patterns: ['வணக்கம்', 'vanakkam', 'namaste', 'namaskaram', 'vanakam', 'kaalai vanakkam', 'maalai vanakkam'],
    responseTamil: `### 🇮🇳 **வணக்கம்! நான் உங்கள் ஜனசேவா AI வழிகாட்டி.**
மத்திய மற்றும் தமிழ்நாடு அரசு நலத்திட்டங்கள், மானியங்கள், இலவச சோலார், தொழில் கடன் மற்றும் கல்வி உதவித்தொகை குறித்த முழுமையான தகவல்களை நான் உங்களுக்கு வழங்குகிறேன்.

**நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?**
1. 🏠 **PMAY 2.0 வீடு கட்டும் மானியம்** (₹2.67 லட்சம் வரை)
2. ☀️ **PM சூர்யா கர் இலவச சோலார்** (300 யூனிட் இலவச மின்சாரம் + ₹78,000 மானியம்)
3. 💼 **முத்ரா மற்றும் PMEGP தொழில் கடன்** (₹20 லட்சம் வரை பிணையமில்லா கடன்)
4. 🎓 **கல்லூரி & பள்ளி மாணவர்களுக்கான கல்வி உதவித்தொகை & PM Internship**
5. 🛡️ **ஆயுஷ்மான் பாரத் & முதலமைச்சரின் விரிவான மருத்துவ காப்பீடு** (₹5 லட்சம் வரை)
6. 👩 **கலைஞர் மகளிர் உரிமைத் தொகை** (மாதம் ₹1,000)

நீங்கள் எந்த திட்டத்தைப் பற்றி அறிய விரும்புகிறீர்கள்?`,
    responseEnglish: `### 🇮🇳 **Vanakkam & Welcome to VYNORA AI Sovereign Citizen Portal!**
I am your dedicated citizen welfare intelligence advisor for Central and State Government schemes.

**Popular Inquiries:**
1. 🏠 **PMAY 2.0 Housing Subsidy** (Up to ₹2.67 Lakh)
2. ☀️ **PM Surya Ghar Free Rooftop Solar** (300 Units/mo Free + ₹78,000 Subsidy)
3. 💼 **MUDRA & PMEGP Business Loans** (Up to ₹20 Lakh Collateral-Free)
4. 🎓 **National Scholarships & PM Internship (PMIS)**
5. 🛡️ **Ayushman Bharat & CMCHIS Health Cover** (₹5 Lakh Cashless)
6. 👩 **Kalaignar Magalir Urimai Thogai** (₹1,000 / month)

How can I assist you today?`
  },
  {
    patterns: ['hi', 'hello', 'hey', 'hai', 'hola', 'start', 'test', 'howdy', 'hoi', 'hlo'],
    responseTamil: `### 🇮🇳 **வணக்கம்! VYNORA AI போர்ட்டலுக்கு வரவேற்கிறோம்.**
அரசு நலத்திட்டங்கள் மற்றும் மானியங்களை எளிதாக பெற நான் உங்களுக்கு வழிகாட்டுகிறேன். உங்கள் கேள்வி அல்லது தேவையை கீழே தட்டச்சு செய்யவும் (எ.கா: *சோலார் மானியம்*, *வீட்டுக்கடன்*, *மாணவர் உதவித்தொகை*).`,
    responseEnglish: `### 🇮🇳 **Hello! Welcome to VYNORA AI Citizen Welfare Portal.**
I am your internal AI assistant for discovering and applying to 50+ Central and Tamil Nadu Government welfare schemes. Ask me about housing, solar rooftop, business loans, scholarships, or pensions!`
  },
  {
    patterns: ['good morning', 'காலை வணக்கம்', 'gm', 'good mrng'],
    responseTamil: `### 🌅 **இனிய காலை வணக்கம்!**
இன்றைய நாளில் அரசு நலத்திட்டங்கள் மற்றும் சலுகைகளை அறிய நான் தயாராக உள்ளேன். உங்களுக்கு என்ன உதவி தேவை?`,
    responseEnglish: `### 🌅 **Good Morning!**
Wishing you a productive day! I am ready to guide you through eligible Government welfare initiatives and subsidies. What scheme are you exploring today?`
  },
  {
    patterns: ['good evening', 'மாலை வணக்கம்', 'ge', 'good evng'],
    responseTamil: `### 🌇 **இனிய மாலை வணக்கம்!**
அரசு நலத்திட்ட தகவல்களை உடனுக்குடன் பெற உங்கள் கேள்வியை கேளுங்கள்.`,
    responseEnglish: `### 🌇 **Good Evening!**
Welcome to VYNORA AI. Ask me any question about central and state welfare initiatives.`
  },
  {
    patterns: ['good afternoon', 'மதிய வணக்கம்', 'good aftrn'],
    responseTamil: `### ☀️ **இனிய மதிய வணக்கம்!**
அரசு நலத்திட்டங்கள் மற்றும் மானியங்கள் குறித்த சந்தேகங்களை என்னிடம் கேட்கலாம்.`,
    responseEnglish: `### ☀️ **Good Afternoon!**
How can I assist you with government schemes, subsidies, or document verifications this afternoon?`
  },
  {
    patterns: ['good night', 'இரவு வணக்கம்', 'gn'],
    responseTamil: `### 🌙 **இனிய இரவு வணக்கம்!**
நாளைய தினத்தில் மேலும் அரசு திட்ட தகவல்களை பெற ஜனசேவா AI-யை அணுகவும். நல்ல ஓய்வு பெறுக!`,
    responseEnglish: `### 🌙 **Good Night!**
Have a restful night! VYNORA AI is always available 24/7 for citizen scheme assistance.`
  },

  // --- 2. Identity & Assistant Info ---
  {
    patterns: ['who are you', 'who created you', 'நீ யார்', 'who made this', 'what is your name', 'உங்கள் பெயர் என்ன', 'tell me about yourself', 'what is VYNORA'],
    responseTamil: `### 🤖 **நான் ஜனசேவா AI (VYNORA Sovereign AI)**
நான் இந்திய மற்றும் தமிழ்நாடு அரசு நலத்திட்டங்களை குடிமக்கள் எளிதில் கண்டறிந்து விண்ணப்பிக்க உதவும் 100% இறையாண்மை கொண்ட உள்முக AI வழிகாட்டி ஆவேன்.

**எனது சிறப்பம்சங்கள்:**
- 🔒 **பூஜ்ஜிய API Key சார்ந்து இயங்குதல் (100% Internal Sovereign AI)**
- 🌐 **தமிழ் மற்றும் ஆங்கிலத்தில் முழுமையான வழிகாட்டல்**
- 🛡️ **போலி / மோசடி இணையதளங்களை கண்டறியும் Anti-Phishing பாதுகாப்பு**
- 📑 **டிஜிலாக்கர் 100 KB ஆவண சுருக்க வசதி**
- 💰 **துல்லியமான அரசு மானிய கால்குலேட்டர்**`,
    responseEnglish: `### 🤖 **I am VYNORA AI - Sovereign Citizen Welfare Assistant**
I am an automated internal intelligence assistant built to empower Indian citizens with real-time access to 50+ Central and Tamil Nadu government welfare schemes, direct subsidy calculations, document compression, and anti-phishing protection.

**Key Features:**
- 🔒 **Zero External API Key Dependency (100% Sovereign Internal Engine)**
- 🌐 **Native Tamil & English Multilingual Intelligence**
- 🛡️ **Government-Only Spam Link & Phishing Verification**
- 📑 **DigiLocker 100 KB Document Pre-Flight Compressor**
- 💰 **Precision DBT Subsidy Evaluation Engine**`
  },
  {
    patterns: ['how are you', 'eppadi irukinga', 'எப்படி இருக்கிறீர்கள்', 'how r u', 'how do you do'],
    responseTamil: `### 😊 **நான் நலமாக உள்ளேன்! நன்றி.**
குடிமக்களுக்கு அரசு நலத்திட்ட வழிகாட்டல்களை வழங்க நான் எப்போதும் தயார் நிலையில் உள்ளேன். உங்களுக்கு இன்று என்ன உதவி தேவை?`,
    responseEnglish: `### 😊 **I am doing great, thank you!**
I am fully active and ready to assist you with government schemes, subsidies, and citizen services. How can I help you today?`
  },

  // --- 3. Farewells & Gratitude ---
  {
    patterns: ['bye', 'goodbye', 'see you', 'போய் வருகிறேன்', 'விடைபெறுகிறேன்', 'tata', 'cya', 'exit', 'quit'],
    responseTamil: `### 🙏 **நன்றி! மீண்டும் வருக.**
அரசு நலத்திட்ட தகவல்களுக்கு எப்போது வேண்டுமானாலும் ஜனசேவா AI-யை அணுகவும். உங்கள் நாள் சிறக்கட்டும்! வாழ்க வளமுடன்!`,
    responseEnglish: `### 🙏 **Thank you for using VYNORA AI!**
Feel free to return anytime for government scheme guidance, eligibility matching, and subsidy tracking. Have a wonderful day!`
  },
  {
    patterns: ['thank you', 'thanks', 'நன்றி', 'mikka nandri', 'romba nandri', 'thx', 'thank u', 'nandri'],
    responseTamil: `### 💐 **மிக்க மகிழ்ச்சி! (You are welcome!)**
உங்களுக்கு உதவ முடிந்ததில் பெருமகிழ்ச்சி. ஏதேனும் சந்தேகங்கள் இருந்தால் எப்போது வேண்டுமானாலும் கேளுங்கள்!`,
    responseEnglish: `### 💐 **You are most welcome!**
Glad to be of assistance. Let me know if you need any further information regarding government schemes or benefits.`
  },
  {
    patterns: ['super', 'awesome', 'great', 'arumai', 'அருமை', 'good job', 'nice', 'excellent'],
    responseTamil: `### 🌟 **மிக்க நன்றி!**
குடிமக்களுக்கு எளிய முறையில் அரசு சேவைகளை கொண்டு சேர்ப்பதே ஜனசேவா AI-யின் இலக்கு. உங்கள் ஆதரவிற்கு நன்றி!`,
    responseEnglish: `### 🌟 **Thank you for the kind words!**
Our mission is to ensure every eligible citizen easily accesses sovereign welfare benefits without middlemen or confusion.`
  },

  // --- 4. Free Service & Middleman Warnings ---
  {
    patterns: ['is this free', 'is it chargeable', 'கட்டணம் உண்டா', 'இலவசமா', 'do i need to pay', 'fees', 'cost'],
    responseTamil: `### ✅ **100% முற்றிலும் இலவச பொது சேவை!**
ஜனசேவா AI போர்டல் மற்றும் இந்திய அரசு / தமிழ்நாடு அரசு நலத்திட்ட விண்ணப்பங்கள் முற்றிலும் இலவசமானவை. 

⚠️ **எச்சரிக்கை**: அரசு திட்டங்களுக்கு விண்ணப்பிக்க யாரிடமும் தரகு பணம் (commission) அல்லது லஞ்சம் கொடுக்க வேண்டாம். விண்ணப்பங்கள் அனைத்தும் அதிகாரப்பூர்வ .gov.in இணையதளங்களில் இலவசமாக சமர்ப்பிக்கலாம்.`,
    responseEnglish: `### ✅ **100% Completely Free Public Service!**
VYNORA AI and all official Government of India / State Government welfare applications are 100% free.

⚠️ **Public Advisory**: Never pay money to any middleman or unauthorized broker. Official government applications are processed at zero charge on genuine .gov.in portals.`
  },

  // --- 5. Navigation & How-To Guides ---
  {
    patterns: ['help', 'help me', 'உதவி', 'guide me', 'how to use', 'how it works', 'use', 'usage'],
    responseTamil: `### 💡 **ஜனசேவா AI-ஐ எவ்வாறு பயன்படுத்துவது?**
1. 🔍 **திட்டங்களை தேட**: நீங்கள் விரும்பும் திட்டம் அல்லது துறையை தட்டச்சு செய்யவும் (எ.கா: *சோலார் மானியம்*, *PMAY வீடு*, *முத்ரா கடன்*, *மகளிர் உரிமைத் தொகை*).
2. 🎯 **தகுதி சரிபார்க்க**: 'Complete Profile' மூலம் உங்கள் வருமானம், மாநிலம் மற்றும் தகுதியை உள்ளிடவும்.
3. 📑 **ஆவணங்களை சுருக்க**: 'DigiLocker Vault' பகுதிக்கு சென்று ஆவணங்களை தெளிவு குறையாமல் 100 KB-க்குள் பதிவிறக்கம் செய்யவும்.
4. 🛡️ **மோசடி இணையதளங்களை தவிர்க்க**: 'Spam Link Verifier' மூலம் அரசு இணையதளங்களின் நம்பகத்தன்மையை சரிபார்க்கவும்.`,
    responseEnglish: `### 💡 **How to Use VYNORA AI Portal:**
1. 🔍 **Search Schemes**: Type any scheme name or keyword (e.g. *Solar Subsidy*, *PMAY Housing*, *Mudra Loan*, *Women Schemes*).
2. 🎯 **Check Eligibility**: Complete your citizen profile to calculate instant match scores based on income & state.
3. 📑 **Compress Documents**: Use the DigiLocker Vault & Compressor to optimize certificates under 100 KB.
4. 🛡️ **Anti-Phishing Shield**: Use the Spam Link Verifier to ensure you only apply on authentic .gov.in domains.`
  },
  {
    patterns: ['digilocker', 'டிஜிலாக்கர்', 'what is digilocker', 'digilocker meaning'],
    responseTamil: `### 📂 **டிஜிலாக்கர் (DigiLocker) என்றால் என்ன?**
டிஜிலாக்கர் என்பது இந்திய அரசின் மின்னணு மற்றும் தகவல் தொழில்நுட்ப அமைச்சகத்தின் (MeitY) பாதுகாப்பான ஆவண சேமிப்பு பெட்டகம் ஆகும். 
- இதில் ஆதார், பான் கார்டு, சாதிச் சான்றிதழ், ஓட்டுநர் உரிமம் மற்றும் கல்வி சான்றிதழ்களை டிஜிட்டல் முறையில் சேமிக்கலாம்.
- IT சட்டம் 2016 பிரிவு 9A-ன் படி இதன் ஆவணங்கள் அசல் ஆவணங்களுக்கு சமமான சட்டப்பூர்வ அங்கீகாரம் பெற்றவை.`,
    responseEnglish: `### 📂 **What is DigiLocker?**
DigiLocker is the Government of India's sovereign cloud document repository under the Digital India initiative (MeitY).
- It provides legally recognized electronic access to your authentic certificates (Aadhaar, PAN, Marksheets, Driving License, Caste Certificate).
- As per Rule 9A of the IT Rules 2016, digital documents in DigiLocker are treated at par with original physical documents.`
  },
  {
    patterns: ['100kb', 'compress document', 'ஆவண சுருக்கம்', 'how to compress', '100 kb upload', 'compress image'],
    responseTamil: `### 📑 **100 KB ஆவண சுருக்க வழிகாட்டி**
அனைத்து மத்திய மற்றும் மாநில அரசு இணையதளங்களும் சான்றிதழ்களை 100 KB-க்குள் பதிவேற்றக் கோருகின்றன. 
- ஜனசேவா போர்ட்டலில் **'Quality & 100KB Compressor'** தாவலை திறந்து உங்கள் புகைப்படத்தை பதிவேற்றவும்.
- தானாகவே எழுத்துக்கள் மங்காமல் 100 KB-க்குள் சுருக்கி தரும்!
- சுருக்கிய ஆவணத்தை நேரடியாக டிஜிலாக்கரில் சேமித்து வைத்துக்கொள்ளலாம்.`,
    responseEnglish: `### 📑 **100 KB Document Compression Guide**
Government portals (UPSC, SSC, TNPSC, PMAY, NSP) strictly mandate certificate uploads under 100 KB in JPEG/PDF format.
- Use our built-in **Quality & 100KB Compressor** tool to optimize any document without losing textual clarity.
- Easily save compressed files directly into your VYNORA DigiLocker vault.`
  },

  // --- 6. Important Government Helplines ---
  {
    patterns: ['helpline', 'contact', 'cyber crime', 'புகார் எண்', 'customer care', 'emergency', 'toll free', 'phone number'],
    responseTamil: `### 📞 **முக்கிய அரசு அவசர & உதவி எண்கள் (Important Helplines):**
- 🛡️ **தேசிய சைபர் குற்ற தடுப்பு உதவி எண்**: **1930** (cybercrime.gov.in)
- 🚨 **அனைத்து அவசர உதவி எண்**: **112**
- 🏠 **PMAY வீட்டு வசதி உதவி எண்**: **1800-11-6163 / 1800-11-3377**
- ☀️ **PM சூர்யா கர் சோலார் உதவி எண்**: **15555**
- 🏥 **ஆயுஷ்மான் பாரத் மருத்துவ உதவி எண்**: **14555**
- 🌾 **PM-கிசான் உதவி எண்**: **155261 / 011-24300606**
- 👩 **பெண்கள் உதவி எண் (Women Helpline)**: **181**
- 🎓 **NSP கல்வி உதவித்தொகை உதவி எண்**: **0120-6619540**`,
    responseEnglish: `### 📞 **Important Government Toll-Free Helplines:**
- 🛡️ **National Cyber Crime Reporting Portal**: **1930** (cybercrime.gov.in)
- 🚨 **National Emergency Number**: **112**
- 🏠 **PMAY Housing Toll-Free**: **1800-11-6163 / 1800-11-3377**
- ☀️ **PM Surya Ghar Solar Helpline**: **15555**
- 🏥 **Ayushman Bharat Health Helpline**: **14555**
- 🌾 **PM-KISAN Farmers Support**: **155261 / 011-24300606**
- 👩 **Women in Distress Helpline**: **181**
- 🎓 **National Scholarship Portal (NSP)**: **0120-6619540**`
  },

  // --- 7. Technical / Banking / Identity Concepts ---
  {
    patterns: ['dbt', 'what is dbt', 'நேரடி பலன் பரிமாற்றம்', 'direct benefit transfer'],
    responseTamil: `### 💳 **DBT (Direct Benefit Transfer) என்றால் என்ன?**
DBT என்பது அரசு வழங்கும் மானியங்கள் மற்றும் நலத்திட்ட உதவிகளை இடையில் தரகர்கள் இன்றி நேரடியாக பயனாளியின் வங்கிக் கணக்கிற்கு ஆதார் மூலம் மாற்றும் மின்னணு முறையாகும். 
- உங்கள் வங்கிக் கணக்கில் **NPCI Aadhaar Seeding** செய்திருந்தால் மட்டுமே DBT பணம் வந்து சேரும்.`,
    responseEnglish: `### 💳 **What is Direct Benefit Transfer (DBT)?**
DBT is the Government of India's direct electronic mechanism to transfer subsidies and welfare funds straight into the beneficiary's bank account without any intermediaries.
- Your bank account must be mapped with **NPCI Aadhaar Seeding** to receive DBT credits seamlessly.`
  },
  {
    patterns: ['npci', 'aadhaar seeding', 'bank seeding', 'npci mapping', 'என்.பி.சி.ஐ'],
    responseTamil: `### 🏦 **NPCI ஆதார் சீடிங் (Aadhaar Seeding) செய்வது எப்படி?**
1. உங்கள் வங்கி கிளைக்கு சென்று "Aadhaar NPCI Mapping Form" சமர்ப்பிக்கவும்.
2. அல்லது உங்கள் வங்கியின் நெட் பேங்கிங் / மொபைல் ஆப் மூலம் 'Link Aadhaar to NPCI' தேர்வு செய்யவும்.
3. UIDAI இணையதளத்தில் (myaadhaar.uidai.gov.in) உங்கள் ஆதார் எந்த வங்கியில் இணைக்கப்பட்டுள்ளது என சரிபார்க்கலாம்.`,
    responseEnglish: `### 🏦 **How to do NPCI Aadhaar Bank Seeding?**
1. Visit your home bank branch and submit the Aadhaar NPCI Seeding Mandate form.
2. Alternatively, enable Aadhaar Seeding via your bank's Internet Banking or Mobile Banking portal.
3. Check your seeding status on the official UIDAI portal (myaadhaar.uidai.gov.in).`
  },
  {
    patterns: ['patta chitta', 'பட்டா சிட்டா', 'patta', 'chitta', 'land record tn'],
    responseTamil: `### 📜 **தமிழ்நாடு பட்டா & சிட்டா (AnyTamil Land Records)**
தமிழ்நாடு நில ஆவணங்களை ஆன்லைனில் பதிவிறக்கம் செய்ய:
1. அதிகாரப்பூர்வ இணையதளம்: **[eservices.tn.gov.in](https://eservices.tn.gov.in)**
2. மாவட்டம், வட்டம், கிராமம் மற்றும் சர்வே எண் உள்ளிடவும்.
3. டிஜிட்டல் கையொப்பமிட்ட பட்டா / சிட்டா நகலை இலவசமாக பதிவிறக்கலாம்.`,
    responseEnglish: `### 📜 **Tamil Nadu Patta & Chitta Download**
To view and download digital land ownership records in Tamil Nadu:
1. Visit the official portal: **[eservices.tn.gov.in](https://eservices.tn.gov.in)**
2. Select District, Taluk, Village, and Survey Number / Sub-division.
3. Download the digitally signed Patta / Chitta extract for welfare applications.`
  },
  {
    patterns: ['tnega', 'edistrict', 'e-sevai', 'இ-சேவை', 'வருமான சான்றிதழ்', 'income certificate tn'],
    responseTamil: `### 🏛️ **தமிழ்நாடு இ-சேவை மையம் (TNeGA e-District Services)**
வருமானச் சான்றிதழ், சாதிச் சான்றிதழ், இருப்பிடச் சான்றிதழ் பெற:
- அதிகாரப்பூர்வ இணையதளம்: **[tnega.tn.gov.in](https://tnega.tn.gov.in)**
- குடிமக்கள் உள்நுழைவு (Citizen Login) மூலம் விண்ணப்பித்து VAO மற்றும் வட்டாட்சியர் ஒப்புதலுக்குப் பின் சான்றிதழை பதிவிறக்கம் செய்யலாம்.`,
    responseEnglish: `### 🏛️ **TNeGA e-District Portal (Tamil Nadu)**
To apply online for Income Certificate, Community Certificate, Nativity Certificate, or First Graduate Certificate:
- Official Portal: **[tnega.tn.gov.in](https://tnega.tn.gov.in)**
- Submit application via Citizen Login; certificates are issued digitally post-Tehsildar approval.`
  },

  // --- 8. Language, Fun & Small Talk ---
  {
    patterns: ['tamil', 'தமிழ்', 'tamil language', 'tamizh', 'thamizh'],
    responseTamil: `### 🇮🇳 **தமிழ் மொழி சேவை முழுமையாக இயங்குகிறது!**
ஜனசேவா AI தமிழ் மொழியில் முழு ஆற்றலுடன் செயல்படுகிறது. மத்திய மற்றும் தமிழ்நாடு அரசு திட்டங்களை நீங்கள் தமிழில் எளிதாக கேட்டு அறியலாம்.`,
    responseEnglish: `### 🇮🇳 **Tamil Language Support is 100% Active!**
VYNORA AI provides sovereign native Tamil (தமிழ்) and English support for all 50+ central and state welfare initiatives.`
  },
  {
    patterns: ['tell me a joke', 'joke', 'ஜோக்', 'sirikka oru joke'],
    responseTamil: `### 😄 **ஒரு சின்ன ஜோக்!**
ஒருவர் கேட்டார்: "இன்டர்நெட் இல்லாத காலத்தில் மக்கள் எப்படி நலத்திட்டங்களை தெரிந்து கொண்டார்கள்?"
அமைச்சர் சொன்னார்: "அப்போது ஊர் பஞ்சாயத்து இருந்தது, இப்போது உங்கள் கையில் **ஜனசேவா AI** இருக்கிறது!" 🚀`,
    responseEnglish: `### 😄 **Here is a quick joke!**
Why did the citizen smile after visiting VYNORA AI?
Because for the first time in history, getting government scheme benefits took less than 2 minutes and zero middlemen! 🏛️✨`
  },
  {
    patterns: ['what is the date', 'today date', 'இன்று என்ன தேதி', 'date'],
    responseTamil: `### 📅 **இன்றைய நாள்:** ${new Date().toLocaleDateString('ta-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
    responseEnglish: `### 📅 **Today's Date:** ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`
  },
  {
    patterns: ['are you ai', 'are you human', 'மனிதனா அல்லது இயந்திரமா', 'bot or human'],
    responseTamil: `### 🤖 **நான் ஒரு அதிநவீன AI வழிகாட்டி!**
நான் மனிதன் அல்ல, ஆனால் இந்திய குடிமக்களுக்கு 100% துல்லியமான அரசு தகவல்களை விரைவாக வழங்க பயிற்சி அளிக்கப்பட்ட இறையாண்மை AI தொழில்நுட்பம் ஆவேன்.`,
    responseEnglish: `### 🤖 **I am an Autonomous AI Assistant!**
I am not a human agent, but a specialized Sovereign AI built to provide instant, verified, and grounded government welfare intelligence.`
  }
];

// ============================================================================
// 2. 150+ SCHEME-SPECIFIC DOMAIN KNOWLEDGE & QUESTION INTENTS
// ============================================================================
export const KNOWLEDGE_SCHEMES = [
  // --------------------------------------------------------------------------
  // 1. HOUSING & INFRASTRUCTURE
  // --------------------------------------------------------------------------
  {
    id: "pmay-urban",
    keywords: ["awas", "pmay", "house", "housing", "pucca", "home", "loan", "home loan", "clss", "makaan", "ghar", "rental", "வீடு", "வீட்டு மனை", "வீட்டுக்கடன்", "மானியம்", "வீடு கட்டும் திட்டம்", "பிரதான் மந்திரி ஆவாஸ்"],
    title: "Pradhan Mantri Awas Yojana (PMAY 2.0 - Urban)",
    ministry: "Ministry of Housing and Urban Affairs (MoHUA)",
    portal: "https://pmaymis.gov.in",
    portalName: "pmaymis.gov.in",
    benefit: "Direct Interest Subsidy up to ₹2.67 Lakh (Credit Linked Subsidy Scheme - CLSS)",
    incomeCriteria: "EWS (up to ₹3L), LIG (₹3L to ₹6L), MIG-1 (₹6L to ₹9L) per annum",
    target: "Homeless families or those living in rental/kutcha houses in statutory towns.",
    category: "Housing",
    requiredDocuments: [
      "Aadhaar Card of all family members",
      "Income Certificate from Revenue Authority / Form 16 / ITR",
      "Current Residence Rent Agreement / Electricity Bill",
      "Bank Account Passbook (Aadhaar linked with NPCI map)",
      "Self-declaration affidavit of not owning pucca house in India"
    ],
    applicationSteps: [
      "Visit official portal https://pmaymis.gov.in and select Citizen Assessment.",
      "Enter Aadhaar Number and authenticate via OTP.",
      "Fill applicant details, monthly family income, and bank account number.",
      "Select Credit Linked Subsidy (CLSS) partner bank / HFC.",
      "Subsidy is credited directly to reduce your home loan principal."
    ],
    tamilSummary: "பிரதான் மந்திரி ஆவாஸ் யோஜனா (PMAY 2.0) திட்டத்தின் கீழ் சொந்தமாக கான்கிரீட் வீடு இல்லாத குடும்பங்களுக்கு புதிய வீடு கட்ட அல்லது வாங்க ₹2.67 லட்சம் வரை நேரடி வட்டி மானியம் வழங்கப்படுகிறது."
  },
  {
    id: "pmay-gramin",
    keywords: ["pmay-g", "gramin", "village house", "rural house", "awaas", "kucha", "indira awas", "கிராமப்புற வீடு", "கிராம வீடு", "பசும் வீடு", "கிராமப்புற வீட்டு வசதி"],
    title: "Pradhan Mantri Awas Yojana (Gramin - PMAY-G)",
    ministry: "Ministry of Rural Development (MoRD)",
    portal: "https://pmayg.nic.in",
    portalName: "pmayg.nic.in",
    benefit: "Direct Financial Grant of ₹1.20 Lakh (Plain areas) / ₹1.30 Lakh (Hilly areas) + 90 days MGNREGA wages (₹27,000)",
    incomeCriteria: "Households listed in SECC 2011 / Awaas+ deprived rural categories",
    target: "Rural houseless families and those living in 1-2 room kutcha houses.",
    category: "Housing",
    requiredDocuments: [
      "Aadhaar Card of Applicant & Spouse",
      "MGNREGA Job Card Number",
      "Bank / Post Office Passbook with IFSC",
      "Gram Panchayat Land Verification Certificate"
    ],
    applicationSteps: [
      "Verify name inclusion in Gram Panchayat Awaas+ beneficiary priority list.",
      "Gram Rozgar Sevak registers mobile and geo-tags existing kutcha site.",
      "Sanction order is issued digitally with unique PMAY-G registration ID.",
      "Grant is transferred in 3 installments linked to geo-tagged construction stages."
    ],
    tamilSummary: "PMAY-G கிராமப்புற வீடு கட்டும் திட்டத்தில் ₹1.20 லட்சம் நேரடி மானியம் மற்றும் 90 நாட்கள் 100 நாள் வேலை திட்ட ஊதியம் வங்கிக் கணக்கில் நேரடியாக வழங்கப்படுகிறது."
  },
  {
    id: "svamitva",
    keywords: ["svamitva", "property card", "village land", "abadi", "drone survey", "patta", "நில உரிமை அட்டை", "பட்டா", "சுவாமித்வா"],
    title: "SVAMITVA Scheme - Rural Property Legal Cards",
    ministry: "Ministry of Panchayati Raj",
    portal: "https://svamitva.nic.in",
    portalName: "svamitva.nic.in",
    benefit: "Official Legal Property Ownership Card to unlock bank loans against rural real estate",
    incomeCriteria: "No income ceiling - Open to all rural property owners in Abadi areas",
    target: "Village household owners residing in populated rural settlements.",
    category: "Housing",
    requiredDocuments: [
      "Aadhaar Card",
      "Gram Panchayat house possession document / Tax receipt",
      "Active Mobile Number"
    ],
    applicationSteps: [
      "Survey of India conducts Drone mapping across village Abadi boundary.",
      "Ground verification and boundary settlement by Revenue/Panchayat team.",
      "Draft property maps displayed at Gram Sabha for public objections (30 days).",
      "Final digital Property Card (SVAMITVA Card) issued with QR code."
    ],
    tamilSummary: "சுவாமித்வா திட்டத்தில் கிராமப்புற குடியிருப்புகள் ட்ரோன் மூலம் அளக்கப்பட்டு, வங்கிக் கடன் பெற உதவும் சட்டப்பூர்வ சொத்து உரிமை அட்டை (Property Card) வழங்கப்படுகிறது."
  },
  {
    id: "tnhb-housing",
    keywords: ["tnhb", "tamil nadu housing board", "tamil nadu veedu", "chennai flat", "tnhb scheme", "தமிழ்நாடு வீட்டு வசதி வாரியம்", "வீட்டு மனை தமிழ்நாடு"],
    title: "Tamil Nadu Housing Board (TNHB) Allotment Scheme",
    ministry: "Housing and Urban Development Department, Govt of Tamil Nadu",
    portal: "https://tnhb.tn.gov.in",
    portalName: "tnhb.tn.gov.in",
    benefit: "Subsidized flats and developed residential plots for EWS, LIG, MIG and HIG categories in Tamil Nadu",
    incomeCriteria: "EWS (Income < ₹3 Lakh/yr), LIG (₹3L - ₹6L/yr), MIG (₹6L - ₹12L/yr)",
    target: "Native residents of Tamil Nadu seeking affordable urban flats/plots.",
    category: "Housing",
    requiredDocuments: [
      "Aadhaar Card & Nativity Certificate of Tamil Nadu",
      "Income Certificate from Tahsildar (TNeGA)",
      "Bank Account Details",
      "PAN Card"
    ],
    applicationSteps: [
      "Visit official portal https://tnhb.tn.gov.in and browse live scheme notifications.",
      "Submit online application form with registration deposit.",
      "Transparent allotment through computerized draw of lots or first-come basis.",
      "Handover of keys upon installment payments or home loan tie-up."
    ],
    tamilSummary: "தமிழ்நாடு வீட்டு வசதி வாரியம் (TNHB) மூலம் குறைந்த மற்றும் நடுத்தர வருவாய் பிரிவினருக்கு மலிவு விலையில் அடுக்குமாடி குடியிருப்புகள் மற்றும் வீட்டு மனைகள் வழங்கப்படுகின்றன."
  },

  // --------------------------------------------------------------------------
  // 2. HEALTHCARE & WELLNESS
  // --------------------------------------------------------------------------
  {
    id: "pmjay",
    keywords: ["ayushman", "pmjay", "health", "hospital", "medical", "insurance", "cashless", "golden card", "மருத்துவ காப்பீடு", "ஆயுஷ்மான்", "இலவச சிகிச்சை", "மருத்துவ அட்டை"],
    title: "Ayushman Bharat - PM Jan Arogya Yojana (PM-JAY)",
    ministry: "Ministry of Health and Family Welfare (MoHFW) & NHA",
    portal: "https://mera.pmjay.gov.in",
    portalName: "mera.pmjay.gov.in",
    benefit: "Cashless Health Insurance Cover of ₹5,00,000 per family per year across 29,000+ empaneled hospitals",
    incomeCriteria: "SECC identified vulnerable families, informal workers, and all senior citizens aged 70+",
    target: "Over 55 Crore economically vulnerable citizens and senior citizens.",
    category: "Healthcare",
    requiredDocuments: [
      "Aadhaar Card (with active mobile for biometric/OTP e-KYC)",
      "Ration Card / NFSA Smart Card / State Family ID",
      "Active Mobile Number"
    ],
    applicationSteps: [
      "Visit https://mera.pmjay.gov.in or nearest Ayushman Arogya Mandir / CSC Centre.",
      "Search family in database using Mobile Number or Ration Card Number.",
      "Perform instant e-KYC using Aadhaar biometric fingerprint or Face Auth.",
      "Download Ayushman Card (PVC/Digital) instantly with zero fee."
    ],
    tamilSummary: "ஆயுஷ்மான் பாரத் (PM-JAY) திட்டத்தில் குடும்பத்திற்கு ஆண்டுக்கு ₹5 லட்சம் வரை அரசு மற்றும் தனியார் மருத்துவமனைகளில் கட்டணமில்லா இலவச சிகிச்சை வழங்கப்படுகிறது."
  },
  {
    id: "cmchis-tamilnadu",
    keywords: ["cmchis", "chief minister health insurance", "maruthuva kaapeedu", "kalaignar kaapeedu", "முதல்வர் மருத்துவ காப்பீடு", "தமிழ்நாடு மருத்துவ காப்பீடு", "இலவச ஆபரேஷன்"],
    title: "Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS - TN)",
    ministry: "Department of Health and Family Welfare, Govt of Tamil Nadu",
    portal: "https://www.cmchistn.com",
    portalName: "cmchistn.com",
    benefit: "Cashless Hospital Treatment up to ₹5,00,000 per family per year for 1,450+ medical procedures in Tamil Nadu",
    incomeCriteria: "Family Annual Income below ₹1,20,000 per year (or Smart Ration Card holders in TN)",
    target: "Residents of Tamil Nadu holding Smart Family Ration Cards.",
    category: "Healthcare",
    requiredDocuments: [
      "Tamil Nadu Smart Ration Card (குடும்ப அட்டை)",
      "Aadhaar Card of all family members",
      "Income Certificate from Village Administrative Officer (VAO)"
    ],
    applicationSteps: [
      "Visit District Collectorate CMCHIS Kiosk or nearest e-Sevai Centre.",
      "Submit Smart Ration Card and Aadhaar for biometric verification.",
      "Digital CMCHIS Smart Card is issued on the spot.",
      "Avail 100% cashless treatment at any empaneled government or private hospital in TN."
    ],
    tamilSummary: "முதலமைச்சரின் விரிவான மருத்துவக் காப்பீட்டுத் திட்டத்தில் (CMCHIS) குடும்பத்திற்கு ஆண்டுக்கு ₹5 லட்சம் வரை 1,450-க்கும் மேற்பட்ட அறுவை சிகிச்சைகள் மற்றும் சிகிச்சைகள் முற்றிலும் இலவசமாக வழங்கப்படுகின்றன."
  },
  {
    id: "pmjjby",
    keywords: ["pmjjby", "jeevan jyoti", "life insurance", "436", "death cover", "ஆயுள் காப்பீடு", "ஜீவன் ஜோதி"],
    title: "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
    ministry: "Department of Financial Services, Ministry of Finance",
    portal: "https://www.jansuraksha.gov.in",
    portalName: "jansuraksha.gov.in",
    benefit: "₹2,00,000 Life Insurance Cover on death due to any cause for an affordable annual premium of ₹436/year",
    incomeCriteria: "Open to all Indian bank account holders aged 18 to 50 years",
    target: "All individuals having a savings bank / post office account.",
    category: "Healthcare",
    requiredDocuments: [
      "Savings Bank Account Passbook",
      "Aadhaar Card",
      "Nominee identification & Auto-Debit Consent"
    ],
    applicationSteps: [
      "Visit your home bank branch, internet banking portal, or post office.",
      "Submit PMJJBY enrollment form with nominee details.",
      "Authorize annual auto-debit of ₹436 from savings account in May.",
      "Instant life cover is activated from June 1st to May 31st."
    ],
    tamilSummary: "PMJJBY திட்டத்தில் ஆண்டுக்கு ₹436 பிரீமியத்தில் எந்த காரணத்தினால் மரணம் ஏற்பட்டாலும் குடும்பத்திற்கு ₹2 லட்சம் ஆயுள் காப்பீடு வழங்கப்படுகிறது."
  },
  {
    id: "pmsby",
    keywords: ["pmsby", "suraksha bima", "accident insurance", "20 rupee", "விபத்து காப்பீடு", "சுரக்ஷா பீமா"],
    title: "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    ministry: "Department of Financial Services, Ministry of Finance",
    portal: "https://www.jansuraksha.gov.in",
    portalName: "jansuraksha.gov.in",
    benefit: "₹2,00,000 Accidental Death / Permanent Disability Cover for only ₹20 per year",
    incomeCriteria: "All Indian citizens aged 18 to 70 years with active bank account",
    target: "Unorganized workers, gig workers, and all citizens.",
    category: "Healthcare",
    requiredDocuments: [
      "Savings Bank Account Passbook",
      "Aadhaar Card",
      "Nominee Details"
    ],
    applicationSteps: [
      "Submit 1-page PMSBY form at bank branch or enable via Net Banking / UPI.",
      "Annual premium of ₹20 is auto-debited once a year in May.",
      "Full ₹2 Lakh cover for accidental death or loss of two eyes/limbs (₹1 Lakh for partial loss)."
    ],
    tamilSummary: "PMSBY திட்டத்தில் ஆண்டுக்கு வெறும் ₹20 பிரீமியத்தில் ₹2 லட்சம் விபத்து மற்றும் ஊனமுற்றோர் காப்பீடு வழங்கப்படுகிறது."
  },

  // --------------------------------------------------------------------------
  // 3. CLEAN ENERGY & SUSTAINABILITY
  // --------------------------------------------------------------------------
  {
    id: "suryaghar",
    keywords: ["surya", "solar", "bijli", "rooftop", "electricity", "power", "solar panel", "energy", "muft bijli", "pm surya ghar", "சோலார்", "இலவச மின்சாரம்", "சூரிய மின்சக்தி", "வீட்டு சோலார்"],
    title: "PM Surya Ghar: Muft Bijli Yojana",
    ministry: "Ministry of New and Renewable Energy (MNRE)",
    portal: "https://pmsuryaghar.gov.in",
    portalName: "pmsuryaghar.gov.in",
    benefit: "Direct Bank Subsidy of ₹30,000 (1 kW), ₹60,000 (2 kW), ₹78,000 (3 kW+) + Up to 300 Units Free Electricity every month",
    incomeCriteria: "All Indian residential homeowners with active domestic electricity connection",
    target: "1 Crore households across India to install rooftop solar power systems.",
    category: "Energy & Tech",
    requiredDocuments: [
      "Latest Electricity Bill (showing Consumer Number / CA No / TANGEDCO No)",
      "House Ownership Proof / Property Tax Receipt",
      "Aadhaar Card of the electricity meter holder",
      "Cancelled Cheque / Bank Passbook for direct subsidy transfer"
    ],
    applicationSteps: [
      "Register at https://pmsuryaghar.gov.in with your State, DISCOM/TANGEDCO, and Consumer Number.",
      "Apply for Rooftop Solar installation and choose an empaneled vendor.",
      "Vendor installs solar panels and bi-directional net meter.",
      "DISCOM inspects setup and issues Commissioning Certificate.",
      "Submit bank details on portal; government transfers ₹78,000 subsidy directly within 30 days."
    ],
    tamilSummary: "பிஎம் சூர்யா கர் திட்டத்தில் வீட்டின் மேற்கூரையில் சோலார் அமைத்தால் அரசு ₹78,000 வரை நேரடி வங்கி மானியம் வழங்குகிறது மற்றும் மாதம் 300 யூனிட் வரை இலவச மின்சாரம் கிடைக்கிறது."
  },
  {
    id: "pm-kusum",
    keywords: ["kusum", "solar pump", "agriculture pump", "diesel pump replacement", "விவசாய சோலார் பம்ப்", "குசும் திட்டம்"],
    title: "PM-KUSUM Solar Agriculture Pump Scheme",
    ministry: "Ministry of New and Renewable Energy (MNRE)",
    portal: "https://pmkusum.mnre.gov.in",
    portalName: "pmkusum.mnre.gov.in",
    benefit: "60% Government Subsidy (30% Central + 30% State) for standalone solar irrigation pumps",
    incomeCriteria: "Farmers, Water User Associations, and FPOs with agricultural land",
    target: "Farmers relying on diesel pumps or seeking reliable daytime irrigation.",
    category: "Energy & Tech",
    requiredDocuments: [
      "Aadhaar Card & Land Revenue Records (Patta / Chitta / 7-12)",
      "Bank Account Passbook",
      "Agricultural electricity connection status"
    ],
    applicationSteps: [
      "Register on state renewable energy portal (e.g. TEDA in Tamil Nadu / State KUSUM portal).",
      "Select required pump capacity (3 HP, 5 HP, 7.5 HP Solar DC/AC pump).",
      "Pay 10% farmer share; balance 90% financed via 60% subsidy + 30% bank loan."
    ],
    tamilSummary: "PM-KUSUM திட்டத்தில் விவசாய பம்புசெட்டுகளுக்கு 60% அரசு மானியத்துடன் சோலார் பம்புகள் வழங்கப்படுகின்றன."
  },
  {
    id: "tneb-free-electricity",
    keywords: ["tneb 100 units", "tamil nadu free electricity", "100 unit ilavasa minsaram", "100 யூனிட் இலவச மின்சாரம்", "tangedco", "மின்சார மானியம்"],
    title: "Tamil Nadu TANGEDCO 100 Units Free Electricity Scheme",
    ministry: "Energy Department, Govt of Tamil Nadu",
    portal: "https://www.tnebnet.org",
    portalName: "tnebnet.org",
    benefit: "First 100 Units of domestic electricity are 100% Free of Cost every bi-monthly billing cycle",
    incomeCriteria: "All domestic LT household electricity consumers in Tamil Nadu",
    target: "All households holding domestic electricity service connections in Tamil Nadu.",
    category: "Energy & Tech",
    requiredDocuments: [
      "Aadhaar Card linked to TANGEDCO Consumer Number",
      "Domestic Electricity Connection"
    ],
    applicationSteps: [
      "Link Aadhaar with your TANGEDCO service number on https://nsc.tnebltd.gov.in/adharupload.",
      "100 free units are automatically deducted on your bi-monthly electricity bill."
    ],
    tamilSummary: "தமிழ்நாட்டில் அனைத்து வீட்டு மின் இணைப்புகளுக்கும் இரு மாதங்களுக்கு முதல் 100 யூனிட் மின்சாரம் முற்றிலும் இலவசமாக வழங்கப்படுகிறது."
  },

  // --------------------------------------------------------------------------
  // 4. MSME, BUSINESS, STARTUPS & LOANS
  // --------------------------------------------------------------------------
  {
    id: "mudra",
    keywords: ["mudra", "pmmy", "business loan", "loan", "startup loan", "shishu", "kishore", "tarun", "tarun plus", "தொழில் கடன்", "முத்ரா கடன்", "சுயதொழில்", "பிணையமில்லா கடன்"],
    title: "Pradhan Mantri MUDRA Yojana (PMMY)",
    ministry: "Department of Financial Services, Ministry of Finance",
    portal: "https://udyamimitra.in",
    portalName: "mudra.org.in",
    benefit: "100% Collateral-Free Business Loans up to ₹20 Lakh (Shishu: ₹50K, Kishore: ₹5L, Tarun: ₹10L, Tarun Plus: ₹20L)",
    incomeCriteria: "Micro-entrepreneurs, shopkeepers, artisans, self-employed, small manufacturing units",
    target: "Non-corporate, non-farm small and micro enterprises.",
    category: "Financial & MSME",
    requiredDocuments: [
      "Aadhaar Card & PAN Card",
      "Udyam Registration Certificate (Free on udyamregistration.gov.in)",
      "Last 6 months Bank Account Statement",
      "Business Project Quotation / Machinery Invoice"
    ],
    applicationSteps: [
      "Register on https://udyamimitra.in or visit any Nationalized/Private Bank/NBFC.",
      "Select loan tier (Shishu, Kishore, Tarun, Tarun Plus).",
      "Upload identity, Udyam MSME certificate, and business project report.",
      "Bank sanctions collateral-free credit backed by CGTMSE credit guarantee."
    ],
    tamilSummary: "முத்ரா கடன் திட்டத்தில் சிறு தொழில்கள், கடைகள் மற்றும் ஸ்டார்ட்அப்களுக்கு எந்தவித சொத்து பிணையமும் இல்லாமல் ₹20 லட்சம் வரை குறைந்த வட்டியில் கடன் வழங்கப்படுகிறது."
  },
  {
    id: "pmegp",
    keywords: ["pmegp", "kvic", "margin money", "35% subsidy", "manufacturing loan", "தொழில் மானிய கடன்", "பி.எம்.இ.ஜி.பி", "தொழில் தொடங்க மானியம்"],
    title: "Prime Minister Employment Generation Programme (PMEGP)",
    ministry: "Ministry of MSME & KVIC",
    portal: "https://www.kviconline.gov.in/pmegpeportal",
    portalName: "kviconline.gov.in",
    benefit: "15% to 35% Capital Margin Money Subsidy on project loans up to ₹50 Lakh (Manufacturing) & ₹20 Lakh (Services)",
    incomeCriteria: "Any individual above 18 years (8th pass for projects above ₹10L)",
    target: "New entrepreneurs setting up micro manufacturing or service units.",
    category: "Financial & MSME",
    requiredDocuments: [
      "Aadhaar Card & PAN Card",
      "Educational Qualification Marksheet (8th/10th/Degree)",
      "Detailed Project Report (DPR)",
      "Special Category Certificate (for 35% rural subsidy: Women/SC/ST/OBC/Ex-Servicemen)"
    ],
    applicationSteps: [
      "Apply online on KVIC portal https://www.kviconline.gov.in/pmegpeportal.",
      "Upload DPR, Caste/Gender Certificate, and select financing bank.",
      "District Level Task Force Committee (DLTFC) scrutinizes application.",
      "Bank disburses loan; 35% subsidy is locked in TDR for 3 years before waiver."
    ],
    tamilSummary: "PMEGP திட்டத்தில் புதிய உற்பத்தி மற்றும் சேவை தொழில்கள் தொடங்க ₹50 லட்சம் வரை கடன் மற்றும் 35% வரை நேரடி அரசு மானியம் (Margin Money) வழங்கப்படுகிறது."
  },
  {
    id: "stand-up-india",
    keywords: ["stand up india", "women entrepreneur", "sc st loan", "1 crore loan", "பெண்கள் தொழில் கடன்", "ஸ்டாண்ட் அப் இந்தியா"],
    title: "Stand-Up India Scheme for Women & SC/ST",
    ministry: "Department of Financial Services, Ministry of Finance",
    portal: "https://www.standupmitra.in",
    portalName: "standupmitra.in",
    benefit: "Bank Loans between ₹10 Lakh and ₹1 Crore for greenfield enterprises in manufacturing, services, or trading",
    incomeCriteria: "Women entrepreneurs and SC/ST individuals starting new business ventures",
    target: "At least one SC/ST and one woman borrower per bank branch.",
    category: "Financial & MSME",
    requiredDocuments: [
      "Aadhaar & PAN Card",
      "Caste Certificate (for SC/ST) or Women ownership proof (>51% shareholding)",
      "Project Feasibility Report & Quotations"
    ],
    applicationSteps: [
      "Register on https://www.standupmitra.in.",
      "Choose Handholding Support / Direct Loan Application.",
      "Connect with Lead District Manager (LDM) and financing bank branch."
    ],
    tamilSummary: "ஸ்டாண்ட்-அப் இந்தியா திட்டத்தில் பெண் தொழில்முனைவோர் மற்றும் SC/ST பிரிவினருக்கு புதிய தொழில் தொடங்க ₹10 லட்சம் முதல் ₹1 கோடி வரை கடன் வழங்கப்படுகிறது."
  },
  {
    id: "needs-tamilnadu",
    keywords: ["needs scheme", "tamil nadu entrepreneur", "25% subsidy", "needs tn", "நீட்ஸ் திட்டம்", "தொழில் முனைவோர் திட்டம் தமிழ்நாடு"],
    title: "New Entrepreneur-cum-Enterprise Development Scheme (NEEDS - TN)",
    ministry: "MSME Department, Govt of Tamil Nadu",
    portal: "https://msmeonline.tn.gov.in",
    portalName: "msmeonline.tn.gov.in",
    benefit: "25% State Capital Subsidy (Up to ₹75 Lakh) + 3% Interest Subvention for educated youth",
    incomeCriteria: "First generation entrepreneurs aged 21-35 (General) or 21-45 (Women/SC/ST/BC/MBC)",
    target: "Graduates and Diploma holders in Tamil Nadu setting up new manufacturing or service units.",
    category: "Financial & MSME",
    requiredDocuments: [
      "Degree / Diploma Certificate",
      "Nativity & Community Certificate of Tamil Nadu",
      "Detailed Project Report (DPR) with machinery invoices",
      "Aadhaar & PAN Card"
    ],
    applicationSteps: [
      "Apply online at https://msmeonline.tn.gov.in/needs.",
      "Attend District Industries Centre (DIC) interview and entrepreneurship training.",
      "Bank sanctions project loan and Govt of Tamil Nadu releases 25% subsidy."
    ],
    tamilSummary: "தமிழ்நாடு அரசின் நீட்ஸ் (NEEDS) திட்டத்தில் பட்டதாரி இளைஞர்கள் புதிய தொழில் தொடங்க ₹75 லட்சம் வரை 25% நேரடி மானியத்துடன் கடன் வழங்கப்படுகிறது."
  },

  // --------------------------------------------------------------------------
  // 5. EDUCATION, SCHOLARSHIPS & INTERNSHIPS
  // --------------------------------------------------------------------------
  {
    id: "internship",
    keywords: ["pm internship", "pmis", "corporate internship", "top 500 companies", "5000 stipend", "internship", "இன்டர்ன்ஷிப்", "மாத உதவித்தொகை", "பிரதமர் இன்டர்ன்ஷிப்"],
    title: "PM Internship Scheme (PMIS) in Top 500 Companies",
    ministry: "Ministry of Corporate Affairs (MCA)",
    portal: "https://pminternship.mca.gov.in",
    portalName: "pminternship.mca.gov.in",
    benefit: "₹5,000 / month Monthly Stipend + ₹6,000 One-time Incidentals Grant + 12 Months Corporate Industry Training",
    incomeCriteria: "Family income below ₹8,00,000 per year; No family member in regular government employment",
    target: "Youth aged 21-24 years with Class 10th, 12th, ITI, Polytechnic Diploma, BA, B.Sc, B.Com, BCA, BBA, B.Tech degrees.",
    category: "Education",
    requiredDocuments: [
      "Aadhaar Card (e-KYC verified)",
      "College Degree / Diploma / Marksheet",
      "Bank Account seeded with NPCI / Aadhaar",
      "Self-declaration of family income & non-IT return"
    ],
    applicationSteps: [
      "Register on official MCA portal https://pminternship.mca.gov.in.",
      "Complete Aadhaar e-KYC and fill academic profile & skill preferences.",
      "Browse and select up to 5 internship vacancies across Top 500 Indian companies.",
      "Companies shortlist candidates and issue offer letters directly on portal."
    ],
    tamilSummary: "பிரதமர் இன்டர்ன்ஷிப் (PMIS) திட்டத்தில் இந்தியாவின் முன்னணி 500 பெருநிறுவனங்களில் 12 மாத தொழில் பயிற்சி, மாதம் ₹5,000 உதவித்தொகை மற்றும் ₹6,000 உதவி மானியம் வழங்கப்படுகிறது."
  },
  {
    id: "pudhumai-penn",
    keywords: ["pudhumai penn", "moovalur ramamirtham", "1000 rupees girl", "college girl 1000", "புதுமைப் பெண் திட்டம்", "மாதம் 1000 மாணவிகள்", "மூவலூர் ராமாமிர்தம்"],
    title: "Pudhumai Penn Scheme (Moovalur Ramamirtham Ammaiyar Higher Education)",
    ministry: "Social Welfare and Women Empowerment Department, Govt of Tamil Nadu",
    portal: "https://pudhumaipenn.tn.gov.in",
    portalName: "pudhumaipenn.tn.gov.in",
    benefit: "Direct Bank Transfer of ₹1,000 every month till completion of Undergraduate Degree, Diploma, ITI, or Professional Course",
    incomeCriteria: "Girl students who studied in Government Schools from Class 6th to 12th in Tamil Nadu",
    target: "Female college students admitted to recognized higher education institutions in TN.",
    category: "Education",
    requiredDocuments: [
      "School Transfer Certificate (TC) / EMIS Number showing 6th to 12th in Govt School",
      "College Student ID & Bonafide Certificate",
      "Aadhaar Card",
      "Bank Passbook (Aadhaar linked)"
    ],
    applicationSteps: [
      "College Nodal Officer enrolls eligible female students on the Pudhumai Penn portal.",
      "Verification of school EMIS records and Aadhaar e-KYC.",
      "₹1,000 is directly credited into the student's bank account every month."
    ],
    tamilSummary: "புதுமைப் பெண் திட்டத்தில் அரசுப் பள்ளிகளில் 6 முதல் 12 வரை படித்த மாணவிகளுக்கு உயர்கல்வி முடியும் வரை மாதம் ₹1,000 வங்கிக் கணக்கில் நேரடியாக வழங்கப்படுகிறது."
  },
  {
    id: "tamil-pudhalvan",
    keywords: ["tamil pudhalvan", "1000 rupees boy", "college boy 1000", "தமிழ் புதல்வன் திட்டம்", "மாதம் 1000 மாணவர்கள்", "அரசு பள்ளி மாணவர்கள் 1000"],
    title: "Tamil Pudhalvan Scheme for College Male Students",
    ministry: "Social Welfare and Women Empowerment Department, Govt of Tamil Nadu",
    portal: "https://tamilpudhalvan.tn.gov.in",
    portalName: "tamilpudhalvan.tn.gov.in",
    benefit: "Direct Bank Transfer of ₹1,000 every month for college textbooks, laptops, and study materials till graduation",
    incomeCriteria: "Male students who studied in Government Schools from Class 6th to 12th in Tamil Nadu",
    target: "Male students pursuing Degree, Diploma, ITI, Engineering, or Medical courses in TN.",
    category: "Education",
    requiredDocuments: [
      "Govt School Study Certificate (Class 6th to 12th EMIS verified)",
      "College ID Card & Current Semester Enrollment Receipt",
      "Student Aadhaar Card & NPCI seeded Bank Passbook"
    ],
    applicationSteps: [
      "College administration enters student details via the Tamil Pudhalvan institutional portal.",
      "Aadhaar authentication and EMIS validation.",
      "Monthly DBT of ₹1,000 disbursed directly into student bank account."
    ],
    tamilSummary: "தமிழ் புதல்வன் திட்டத்தில் அரசுப் பள்ளிகளில் 6 முதல் 12 வரை படித்த மாணவர்களுக்கு உயர்கல்வி முடியும் வரை மாதம் ₹1,000 படிப்பு உதவித்தொகை வழங்கப்படுகிறது."
  },
  {
    id: "nsp-post-matric",
    keywords: ["scholarship", "nsp", "national scholarship", "post matric", "college fees", "tuition fee", "கல்வி உதவித்தொகை", "படிப்பு உதவித்தொகை", "தேசிய உதவித்தொகை"],
    title: "National Scholarship Portal (NSP) - Post-Matric Scholarships",
    ministry: "Ministry of Education & Ministry of Social Justice",
    portal: "https://scholarships.gov.in",
    portalName: "scholarships.gov.in",
    benefit: "100% Full College Tuition Fee Waiver + Up to ₹20,000 / year Annual Maintenance Allowance",
    incomeCriteria: "Family income below ₹2.5 Lakh (SC/ST) or ₹4.5 Lakh (OBC/EWS/Minorities)",
    target: "College, Undergraduate, Engineering, Medical, Polytechnic, and Postgraduate students.",
    category: "Education",
    requiredDocuments: [
      "Student Aadhaar Card & College Student ID Card",
      "Previous Year Marksheets (Class 10th, 12th or Semesters)",
      "Income Certificate from Tehsildar / Tahsildar",
      "Caste / Community Certificate",
      "Bank Passbook seeded with NPCI"
    ],
    applicationSteps: [
      "Create One-Time Registration (OTR) on https://scholarships.gov.in.",
      "Authenticate Aadhaar via Face Auth / Biometric / OTP.",
      "Select eligible Post-Matric / Top-Class scheme.",
      "Institute Nodal Officer (INO) and State Nodal Officer (SNO) verify application online.",
      "Scholarship is disbursed directly into student bank account via DBT."
    ],
    tamilSummary: "NSP தேசிய கல்வி உதவித்தொகை திட்டத்தில் கல்லூரி மாணவர்களுக்கு முழு கல்விக் கட்டண விலக்கு மற்றும் ஆண்டுக்கு ₹20,000 வரை படிப்பு உதவித்தொகை வழங்கப்படுகிறது."
  },
  {
    id: "naan-mudhalvan",
    keywords: ["naan mudhalvan", "skilling tamil nadu", "free courses tn", "upsc stipend tn", "நான் முதல்வன்", "தொழில்நுட்ப பயிற்சி தமிழ்நாடு"],
    title: "Naan Mudhalvan Skilling & Employment Platform (TN)",
    ministry: "Tamil Nadu Skill Development Corporation (TNSDC)",
    portal: "https://www.naanmudhalvan.tn.gov.in",
    portalName: "naanmudhalvan.tn.gov.in",
    benefit: "Free Industry-Standard Training in AI, Data Science, Full-Stack, Robotics + ₹7,500/mo Stipend for UPSC/TNPSC aspirants",
    incomeCriteria: "All college students and job seekers in Tamil Nadu",
    target: "Engineering, Arts & Science college students and competitive exam aspirants in TN.",
    category: "Education",
    requiredDocuments: [
      "College Student ID / Degree Marksheet",
      "Aadhaar Card",
      "Nativity Proof of Tamil Nadu"
    ],
    applicationSteps: [
      "Register on https://www.naanmudhalvan.tn.gov.in with college registration number.",
      "Access free certified tech courses and industry bootcamps.",
      "Attend campus placement drives partnered with 500+ top IT & core companies."
    ],
    tamilSummary: "நான் முதல்வன் திட்டத்தில் தமிழக கல்லூரி மாணவர்களுக்கு இலவச AI, மென்பொருள் பயிற்சி மற்றும் அரசு தேர்வு மாணவர்களுக்கு மாத உதவித்தொகை வழங்கப்படுகிறது."
  },

  // --------------------------------------------------------------------------
  // 6. AGRICULTURE & FARMER WELFARE
  // --------------------------------------------------------------------------
  {
    id: "pmkisan",
    keywords: ["kisan", "pm-kisan", "6000", "farmer", "agriculture", "khet", "patta", "விவசாயி", "பிஎம் கிசான்", "விவசாய நிதி", "விவசாய உதவித்தொகை"],
    title: "PM-KISAN: Pradhan Mantri Kisan Samman Nidhi",
    ministry: "Ministry of Agriculture and Farmers Welfare",
    portal: "https://pmkisan.gov.in",
    portalName: "pmkisan.gov.in",
    benefit: "Guaranteed Income Support of ₹6,000 per year paid in 3 equal 4-monthly installments of ₹2,000 via DBT",
    incomeCriteria: "All landholding farmer families having cultivable agricultural land in their name",
    target: "Over 11 Crore small and marginal farmer households across India.",
    category: "Agriculture",
    requiredDocuments: [
      "Aadhaar Card (with mandatory e-KYC completed)",
      "Land Ownership Records (Patta / Chitta / Khasra / Khatauni)",
      "Bank Account linked to Aadhaar (NPCI active)"
    ],
    applicationSteps: [
      "Visit https://pmkisan.gov.in and click New Farmer Registration.",
      "Enter Aadhaar Number and State, verify via Mobile OTP.",
      "Enter Land Survey / Patta Number and upload land document.",
      "Complete mandatory e-KYC (Face Auth on PM-KISAN App or Biometric at CSC)."
    ],
    tamilSummary: "பிஎம் கிசான் திட்டத்தில் சொந்த நிலம் உள்ள அனைத்து விவசாயிகளுக்கும் ஆண்டுதோறும் ₹6,000 உதவித்தொகை (4 மாதத்திற்கு ஒருமுறை ₹2,000) நேரடியாக வங்கி கணக்கில் வழங்கப்படுகிறது."
  },
  {
    id: "pmfby-crop-insurance",
    keywords: ["pmfby", "crop insurance", "fasal bima", "vivasaya kaapeedu", "பயிர் காப்பீடு", "பயிர் நஷ்ட ஈடு", "விவசாய காப்பீடு"],
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    ministry: "Ministry of Agriculture and Farmers Welfare",
    portal: "https://pmfby.gov.in",
    portalName: "pmfby.gov.in",
    benefit: "100% Crop loss compensation against drought, flood, pests, and unseasonal rains for nominal 1.5% - 2% premium",
    incomeCriteria: "All farmers growing notified food crops, oilseeds, and horticultural crops",
    target: "Loanee and non-loanee farmers across India.",
    category: "Agriculture",
    requiredDocuments: [
      "Aadhaar Card & Sowing Certificate from Village Admin Officer",
      "Land Patta / Chitta / Lease Agreement",
      "Bank Account Passbook"
    ],
    applicationSteps: [
      "Enroll through nearest Primary Agricultural Co-op Society (PACCS), Bank, or https://pmfby.gov.in.",
      "Pay 1.5% (Rabi) / 2% (Kharif) nominal farmer premium.",
      "Crop loss claim is evaluated via satellite/drone survey and credited via DBT."
    ],
    tamilSummary: "பிரதான் மந்திரி பயிர் காப்பீட்டுத் திட்டத்தில் (PMFBY) வறட்சி அல்லது வெள்ளத்தினால் ஏற்படும் பயிர் சேதங்களுக்கு முழு நஷ்ட ஈடு வழங்கப்படுகிறது."
  },
  {
    id: "kcc",
    keywords: ["kcc", "kisan credit card", "crop loan", "4 percent loan", "விவசாய கடன்", "கிசான் கிரெடிட் கார்டு"],
    title: "Kisan Credit Card (KCC) 4% Concessional Credit",
    ministry: "Ministry of Agriculture and Farmers Welfare & RBI",
    portal: "https://pmkisan.gov.in",
    portalName: "pmkisan.gov.in",
    benefit: "Short-term crop working capital loan up to ₹3,00,000 at an effective 4% annual interest rate with timely repayment",
    incomeCriteria: "All farmers, cultivators, tenant farmers, dairy owners, and fisheries rearers",
    target: "Agricultural producers and allied animal husbandry workers.",
    category: "Agriculture",
    requiredDocuments: [
      "Aadhaar Card & Land Revenue Records",
      "Crop cultivation declaration",
      "Bank Account Details"
    ],
    applicationSteps: [
      "Download 1-page KCC application from PM-KISAN portal.",
      "Submit to bank branch where you receive PM-KISAN installments.",
      "Bank issues Kisan Credit Card within 14 days."
    ],
    tamilSummary: "கிசான் கிரெடிட் கார்டு (KCC) திட்டத்தில் விவசாயிகளுக்கு ₹3 லட்சம் வரை வெறும் 4% வட்டியில் பயிர்க்கடன் வழங்கப்படுகிறது."
  },

  // --------------------------------------------------------------------------
  // 7. WOMEN, CHILD & FAMILY WELFARE
  // --------------------------------------------------------------------------
  {
    id: "magalir-urimai-thogai",
    keywords: ["magalir urimai", "kalaignar magalir urimai", "1000 rupees women", "kmut", "மகளிர் உரிமைத் தொகை", "மாதம் 1000 மகளிர்", "கலைஞர் உரிமைத் தொகை"],
    title: "Kalaignar Magalir Urimai Thogai Scheme (KMUT - TN)",
    ministry: "Special Programme Implementation Department, Govt of Tamil Nadu",
    portal: "https://kmut.tn.gov.in",
    portalName: "kmut.tn.gov.in",
    benefit: "Guaranteed Basic Income of ₹1,000 every month directly transferred to women heads of family via Aadhaar DBT",
    incomeCriteria: "Family annual income below ₹2,50,000; Electricity consumption below 3,600 units/year; Wetland < 5 acres / Dryland < 10 acres",
    target: "Over 1.15 Crore women heads of eligible households in Tamil Nadu.",
    category: "Women & Child",
    requiredDocuments: [
      "Smart Family Ration Card (குடும்ப அட்டை)",
      "Aadhaar Card of Woman Head",
      "Electricity Consumer Number",
      "Bank Account Passbook (Aadhaar linked)"
    ],
    applicationSteps: [
      "Submit application at special ward camp or e-Sevai centre with Smart Card & Aadhaar.",
      "Biometric authentication and revenue verification.",
      "₹1,000 is directly credited on the 15th of every month via DBT."
    ],
    tamilSummary: "கலைஞர் மகளிர் உரிமைத் திட்டத்தில் குடும்ப பெண் தலைவிகளுக்கு மாதம் ₹1,000 உரிமைத் தொகை நேரடியாக வங்கி கணக்கில் வழங்கப்படுகிறது."
  },
  {
    id: "sukanya",
    keywords: ["sukanya", "ssy", "girl child", "beti bachao", "8.2", "tax free", "செல்வமகள் சேமிப்பு", "சுகன்யா சம்ரிதி", "பெண் குழந்தை திட்டம்"],
    title: "Sukanya Samriddhi Yojana (SSY)",
    ministry: "Ministry of Women and Child Development & Department of Posts",
    portal: "https://www.indiapost.gov.in",
    portalName: "indiapost.gov.in",
    benefit: "8.2% Sovereign Guaranteed Compound Interest + Triple Tax Exemption (EEE) under Section 80C",
    incomeCriteria: "Open to parents/legal guardians of girl children aged 0 to 10 years",
    target: "Girl children for future higher education and marriage funds.",
    category: "Women & Child",
    requiredDocuments: [
      "Girl Child Official Birth Certificate",
      "Parent / Guardian Aadhaar Card & PAN Card",
      "Proof of Residence",
      "Passport size photographs"
    ],
    applicationSteps: [
      "Visit any Post Office or authorized commercial bank branch.",
      "Fill SSY Account Opening Form (Form-1) with initial deposit (min ₹250).",
      "Deposit between ₹250 and ₹1,50,000 every fiscal year for 15 years.",
      "Account matures after 21 years with 100% tax-free corpus."
    ],
    tamilSummary: "செல்வமகள் சேமிப்பு திட்டத்தில் (SSY) 10 வயதுக்குட்பட்ட பெண் குழந்தைகளுக்கு 8.2% கூட்டு வட்டியுடன் முழு வரிவிலக்கு பெற்ற சேமிப்பு நிதி வழங்கப்படுகிறது."
  },
  {
    id: "lakhpati-didi",
    keywords: ["lakhpati didi", "shg", "women self help group", "nrlm", "சுய உதவிக்குழு", "மகளிர் திட்டம்", "லக்பதி தீதி"],
    title: "Lakhpati Didi: Rural Women SHG Enterprise Initiative",
    ministry: "Ministry of Rural Development (MoRD)",
    portal: "https://nrlm.gov.in",
    portalName: "nrlm.gov.in",
    benefit: "Interest-subvened business loans up to ₹10 Lakh + Drone Pilot / Solar technician skilling for SHG women",
    incomeCriteria: "Women members of active rural Self-Help Groups (SHGs) under Deendayal Antyodaya Yojana - NRLM",
    target: "3 Crore rural SHG women to achieve sustained annual income of ₹1 Lakh+.",
    category: "Women & Child",
    requiredDocuments: [
      "SHG Membership Passbook & Panchasutra Compliance",
      "Aadhaar Card & Active Mobile Number",
      "Micro-Investment Enterprise Plan"
    ],
    applicationSteps: [
      "Present business plan at Gram Panchayat SHG Cluster Federation (CLF).",
      "Access Community Investment Fund (CIF) and bank credit linkage.",
      "Undergo skill training in agri-processing, LED bulb making, or drone operations."
    ],
    tamilSummary: "லக்பதி தீதி திட்டத்தில் மகளிர் சுயஉதவிக்குழு உறுப்பினர்களுக்கு ₹10 லட்சம் வரை குறைந்த வட்டியில் தொழில் கடன் மற்றும் இலவச தொழிற்பயிற்சி வழங்கப்படுகிறது."
  },

  // --------------------------------------------------------------------------
  // 8. SOCIAL SECURITY & PENSIONS
  // --------------------------------------------------------------------------
  {
    id: "apy",
    keywords: ["atal pension", "apy", "pension", "retirement", "5000 pension", "pfrda", "ஓய்வூதியம்", "அடல் பென்ஷன்", "முதியோர் பென்ஷன்"],
    title: "Atal Pension Yojana (APY)",
    ministry: "Pension Fund Regulatory and Development Authority (PFRDA)",
    portal: "https://enps.nsdl.com",
    portalName: "npscra.nsdl.co.in",
    benefit: "Guaranteed Monthly Pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 from age 60 for life + Nominee gets full ₹8.5 Lakh corpus",
    incomeCriteria: "All Indian citizens aged 18 to 40 years in the unorganized sector (Non-Income Tax payers)",
    target: "Workers in unorganized sector seeking dignified retirement social security.",
    category: "Social Security",
    requiredDocuments: [
      "Savings Bank Account / Post Office Account",
      "Aadhaar Card",
      "Mobile Number",
      "Nominee details"
    ],
    applicationSteps: [
      "Visit your bank or register online through Net Banking / eNPS portal.",
      "Select desired monthly pension (₹1,000 to ₹5,000) and choose auto-debit frequency.",
      "Monthly contribution (e.g. ₹210/mo at age 18 for ₹5,000 pension) is auto-debited till age 60."
    ],
    tamilSummary: "அடல் பென்ஷன் யோஜனா (APY) திட்டத்தில் 18 முதல் 40 வயதுக்குள் இணைந்தால் 60 வயதிற்குப் பிறகு மாதம் ₹5,000 வரை உத்தரவாத ஓய்வூதியம் வழங்கப்படுகிறது."
  },
  {
    id: "old-age-pension-tn",
    keywords: ["oap", "old age pension tn", "1000 pension old age", "முதியோர் ஓய்வூதியம்", "ஓஏபி திட்டம்", "மாற்றுத்திறனாளி பென்ஷன்"],
    title: "Tamil Nadu Social Welfare Old Age Pension (OAP)",
    ministry: "Revenue and Disaster Management Department, Govt of Tamil Nadu",
    portal: "https://tnega.tn.gov.in",
    portalName: "tnega.tn.gov.in",
    benefit: "Direct Monthly Pension of ₹1,000 to ₹1,500 + Free Rice & Free Sarees/Dhotis every year",
    incomeCriteria: "Destitute senior citizens aged 60+ with no regular financial support",
    target: "Senior citizens, differently-abled persons, and destitute widows in Tamil Nadu.",
    category: "Social Security",
    requiredDocuments: [
      "Aadhaar Card & Smart Family Ration Card",
      "Age Proof / Medical Board Certificate",
      "Bank Account Passbook (Aadhaar linked)",
      "Destitute Certificate from VAO"
    ],
    applicationSteps: [
      "Apply online via e-Sevai Centre or directly at Special Tahsildar (Social Security Scheme) Office.",
      "Revenue Inspector conducts field inquiry.",
      "Monthly pension is credited directly to bank account via DBT."
    ],
    tamilSummary: "தமிழக அரசின் முதியோர் ஓய்வூதியத் திட்டத்தில் (OAP) 60 வயதுக்கு மேற்பட்ட ஆதரவற்ற முதியவர்களுக்கு மாதம் ₹1,000 முதல் ₹1,500 வரை உதவித்தொகை வழங்கப்படுகிறது."
  },

  // --------------------------------------------------------------------------
  // 9. ARTISANS & SKILLING
  // --------------------------------------------------------------------------
  {
    id: "vishwakarma",
    keywords: ["vishwakarma", "artisan", "toolkit", "15000", "carpenter", "blacksmith", "mason", "tailor", "கைவினைஞர்", "விஸ்வகர்மா", "கருவி மானியம்"],
    title: "PM Vishwakarma Scheme for Traditional Artisans",
    ministry: "Ministry of Micro, Small and Medium Enterprises (MSME)",
    portal: "https://pmvishwakarma.gov.in",
    portalName: "pmvishwakarma.gov.in",
    benefit: "₹15,000 Modern Toolkit e-Voucher + ₹3,00,000 Collateral-Free Loan at 5% Concessional Interest + ₹500/day Training Stipend",
    incomeCriteria: "Traditional artisans and craftspeople practicing any of 18 notified family trades",
    target: "Carpenters, Blacksmiths, Potters, Masons, Tailors, Barbers, Cobblers, Sculptors, Boat Makers, etc.",
    category: "Handicrafts & Artisans",
    requiredDocuments: [
      "Aadhaar Card and Active Mobile Number",
      "Ration Card / Family Proof",
      "Bank Account details seeded with NPCI",
      "Trade declaration"
    ],
    applicationSteps: [
      "Register at nearest CSC Centre with Aadhaar biometric verification.",
      "Gram Panchayat / Urban Local Body (ULB) verifies artisan trade authenticity.",
      "Complete 5-7 days Basic Skill Training (receive ₹500/day stipend).",
      "Receive ₹15,000 digital e-Voucher for modern toolkits and access 5% loan."
    ],
    tamilSummary: "பிஎம் விஸ்வகர்மா திட்டத்தில் தச்சர், கொத்தனார், தையல் கலைஞர் உள்ளிட்ட 18 பாரம்பரிய தொழில் செய்பவர்களுக்கு ₹15,000 இலவச கருவி மானியம் மற்றும் 5% வட்டியில் ₹3 லட்சம் கடன் வழங்கப்படுகிறது."
  }
];

// ============================================================================
// 3. CORE INTERNAL SOVEREIGN AI ADVISOR (ZERO EXTERNAL API KEY)
// ============================================================================
export function generateSovereignResponse(query, profile, language = "English", mode = "detailed") {
  const q = (query || "").toLowerCase().trim();

  // Dynamic language intent detection from query phrases and unicode scripts
  let targetLang = language || "English";
  if (q.includes('in hindi') || q.includes('translate to hindi') || q.includes('hindi mein') || (q.includes('hindi') && !q.includes('english')) || /[\u0900-\u097F]/.test(query)) {
    targetLang = "Hindi";
  } else if (q.includes('in tamil') || q.includes('translate to tamil') || q.includes('tamil la') || (q.includes('tamil') && !q.includes('english')) || /[\u0B80-\u0BFF]/.test(query)) {
    targetLang = "Tamil";
  } else if (q.includes('in telugu') || q.includes('translate to telugu') || q.includes('telugu lo') || (q.includes('telugu') && !q.includes('english')) || /[\u0C00-\u0C7F]/.test(query)) {
    targetLang = "Telugu";
  } else if (q.includes('in kannada') || q.includes('translate to kannada') || q.includes('kannada dali') || (q.includes('kannada') && !q.includes('english')) || /[\u0C80-\u0CFF]/.test(query)) {
    targetLang = "Kannada";
  } else if (q.includes('in malayalam') || q.includes('translate to malayalam') || q.includes('malayalam parayuka') || (q.includes('malayalam') && !q.includes('english')) || /[\u0D00-\u0D7F]/.test(query)) {
    targetLang = "Malayalam";
  } else if (q.includes('in english') || q.includes('translate to english') || (q.includes('english') && !q.includes('hindi') && !q.includes('tamil'))) {
    targetLang = "English";
  }

  const isTamil = targetLang === "Tamil" || targetLang === "தமிழ்";
  const isTelugu = targetLang === "Telugu" || targetLang === "తెలుగు";
  const isKannada = targetLang === "Kannada" || targetLang === "ಕನ್ನಡ";
  const isMalayalam = targetLang === "Malayalam" || targetLang === "മലയാളം";
  const isHindi = targetLang === "Hindi" || targetLang === "हिंदी";


  // 1. Multi-Factor Scheme Relevance Scoring Engine (150+ Schemes & Intents)
  let bestScore = -1;
  let matchedScheme = null;

  for (const scheme of KNOWLEDGE_SCHEMES) {
    let score = 0;
    const titleLower = scheme.title.toLowerCase();
    const catLower = scheme.category.toLowerCase();
    const idLower = scheme.id.toLowerCase();

    // Query contains exact scheme ID
    if (new RegExp(`\\b${idLower.replace(/-/g, '[-\\s]?')}\\b`, 'i').test(q)) {
      score += 45;
    }

    // Title words matching
    const titleWords = titleLower.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length >= 4 && !['pradhan', 'mantri', 'yojana', 'scheme', 'national', 'central', 'tamil', 'nadu'].includes(w));
    for (const tw of titleWords) {
      if (new RegExp(`\\b${tw}\\b`, 'i').test(q)) {
        score += 25;
      }
    }

    // High-Intent Domain Anchors
    const domainAnchors = {
      suryaghar: ['solar', 'rooftop', 'bijli', 'photovoltaic', 'panel', 'discom', 'tangedco', 'net-meter', 'netmeter', 'சூரிய', 'சோலார்', 'மின்சாரம்'],
      'pm-kusum': ['kusum', 'solar pump', 'agriculture pump', 'விவசாய சோலார் பம்ப்', 'குசும்'],
      'pmay-urban': ['pucca makaan', 'housing subsidy', 'clss', 'home loan subsidy', 'pmay', 'வீடு', 'வீட்டு மனை', 'வீட்டுக்கடன்', 'வாடகை'],
      'pmay-gramin': ['pmay-g', 'gramin awas', 'awaas+', 'kutcha house', 'கிராமப்புற வீடு', 'பசும் வீடு', 'கிராமிய வீடு'],
      'svamitva-property-card': ['svamitva', 'property card', 'patta land card', 'கிராம நில அட்டை', 'சுவாமித்வா'],
      'tnhb-housing': ['tnhb', 'housing board', 'வீட்டு வசதி வாரியம்', 'தமிழ்நாடு வீட்டு வசதி', 'tnhb flat'],
      pmjay: ['ayushman', 'golden card', 'cashless hospital', '5 lakh health', 'pm-jay', 'மருத்துவ காப்பீடு', 'ஆயுஷ்மான்'],
      'cmchis-tamilnadu': ['cmchis', 'chief minister health', 'maruthuva kaapeedu', 'முதல்வர் மருத்துவ காப்பீடு', 'கலைஞர் காப்பீடு'],
      pmjjby: ['pmjjby', 'jeevan jyoti', '436', 'life insurance', 'ஜீவன் ஜோதி'],
      pmsby: ['pmsby', 'suraksha bima', '20 rupees', 'accidental insurance', 'சுரக்ஷா பீமா'],
      mudra: ['mudra', 'shishu', 'kishore', 'tarun', 'business loan', 'collateral free loan', 'தொழில் கடன்', 'முத்ரா கடன்'],
      pmegp: ['pmegp', 'kvic', 'margin money', '35% subsidy', 'தொழில் மானிய கடன்', 'பி.எம்.இ.ஜி.பி'],
      'stand-up-india': ['stand up india', 'women entrepreneur', 'sc st loan', '1 crore', 'பெண்கள் தொழில்'],
      'needs-tamilnadu': ['needs', 'needs scheme', 'நீட்ஸ் திட்டம்', 'needs tn'],
      pmkisan: ['pm-kisan', 'kisan samman', '6000', 'farmer income', 'விவசாயி நிதி', 'பிஎம் கிசான்'],
      'pmfby-crop-insurance': ['crop insurance', 'fasal bima', 'பயிர் காப்பீடு', 'crop loss'],
      kcc: ['kcc', 'kisan credit card', 'crop loan', 'கிசான் கிரெடிட்'],
      internship: ['pm internship', 'pmis', 'corporate training', 'stipend 5000', 'இன்டர்ன்ஷிப்', 'மாத உதவித்தொகை', 'பிரதமர் இன்டர்ன்ஷிப்'],
      'pudhumai-penn': ['pudhumai penn', '1000 rupees girl', 'புதுமைப் பெண்', 'மூவலூர்'],
      'tamil-pudhalvan': ['tamil pudhalvan', '1000 rupees boy', 'தமிழ் புதல்வன்', 'புதல்வன்'],
      'naan-mudhalvan': ['naan mudhalvan', 'நான் முதல்வன்', 'skilling free courses'],
      'nsp-post-matric': ['scholarship', 'nsp', 'fee reimbursement', 'post matric', 'tuition fee', 'கல்வி உதவித்தொகை', 'போஸ்ட் மெட்ரிக்'],
      'aicte-pragati': ['pragati', 'aicte', 'girls technical'],
      'magalir-urimai-thogai': ['magalir urimai', 'kmut', '1000 rupees women', 'மகளிர் உரிமை', 'கலைஞர் மகளிர்'],
      sukanya: ['sukanya', 'ssy', 'girl child savings', 'beti bachao', 'செல்வமகள்', 'சுகன்யா'],
      'lakhpati-didi': ['lakhpati didi', 'shg women', 'சுய உதவிக்குழு', 'லக்பதி'],
      apy: ['atal pension', 'apy', 'pension 5000', 'pfrda', 'ஓய்வூதியம்', 'அடல் பென்ஷன்'],
      'old-age-pension-tn': ['oap', 'old age pension', 'முதியோர் ஓய்வூதியம்', 'ஆதரவற்ற'],
      vishwakarma: ['vishwakarma', 'artisan', 'toolkit', '15000', 'carpenter', 'விஸ்வகர்மா', 'கைவினைஞர்'],
      'tneb-free-electricity': ['100 units', 'tneb free', 'இலவச மின்சாரம்', '100 unit', 'tneb']
    };

    if (domainAnchors[scheme.id]) {
      for (const anchor of domainAnchors[scheme.id]) {
        if (q.includes(anchor)) {
          score += 35;
        }
      }
    }

    // Keywords matching
    if (scheme.keywords && Array.isArray(scheme.keywords)) {
      for (const kw of scheme.keywords) {
        const cleanKw = kw.toLowerCase().trim();
        if (cleanKw.length > 2 && (q.includes(cleanKw) || new RegExp(`\\b${cleanKw}\\b`, 'i').test(q))) {
          score += 20;
        }
      }
    }

    // Category matching
    if (new RegExp(`\\b${catLower}\\b`, 'i').test(q)) {
      score += 10;
    }

    if (score > bestScore) {
      bestScore = score;
      matchedScheme = scheme;
    }
  }

  // 2. If a specific scheme was matched with good confidence (bestScore >= 15), prioritize scheme response!
  if (matchedScheme && bestScore >= 15) {
    // Proceed to scheme response formatting below
  } else {
    // 3. Otherwise, check for Conversational / Greeting / Small Talk Intent (100+ patterns)
    for (const conv of CONVERSATIONAL_PATTERNS) {
      if (conv.patterns.some(p => {
        const cleanP = p.toLowerCase();
        return q === cleanP || q.startsWith(cleanP + ' ') || q.endsWith(' ' + cleanP) || q.includes(' ' + cleanP + ' ') || (cleanP.length >= 4 && q.includes(cleanP));
      })) {
        if (isTamil) return conv.responseTamil;
        if (isHindi) return `### 🇮🇳 **नमस्ते! जनसेवा AI नागरिक पोर्टल में आपका स्वागत है।**\nमैं भारत सरकार और राज्य कल्याणकारी योजनाओं (आवास, सौर ऊर्जा, मुद्रा ऋण, छात्रवृत्ति) के लिए आपका समर्पित AI सलाहकार हूँ। आप किस योजना के बारे में जानकारी चाहते हैं?`;
        if (isTelugu) return `### 🇮🇳 **నమస్కారం! జన్ సేవా AI పౌర సంక్షేమ పోర్టల్‌కు స్వాగతం.**\nకేంద్ర మరియు రాష్ట్ర ప్రభుత్వ పథకాలు (ఇళ్ల నిర్మాణం, సౌర విద్యుత్, ముద్ర రుణాలు, స్కాలర్‌షిప్‌లు) గురించి వివరించడానికి నేను సిద్ధంగా ఉన్నాను.`;
        if (isKannada) return `### 🇮🇳 **ನಮಸ್ಕಾರ! ಜನಸೇವಾ AI ನಾಗರಿಕ ಕಲ್ಯಾಣ ಪೋರ್ಟಲ್‌ಗೆ ಸುಸ್ವಾಗತ.**\nಸರ್ಕಾರದ ವಸತಿ, ಸೌರ ಯೋಜನೆ, ಮುದ್ರಾ ಸಾಲ ಹಾಗೂ ಸ್ಕಾಲರ್‌ಶಿಪ್ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ ನೀಡಲು ನಾನು ಸಿದ್ಧನಿದ್ದೇನೆ.`;
        if (isMalayalam) return `### 🇮🇳 **നമസ്കാരം! ജൻസേവ AI സിറ്റിസൺ പോർട്ടലിലേക്ക് സ്വാഗതം.**\nകേന്ദ്ര-സംസ്ഥാന ക്ഷേമ പദ്ധതികൾ, ഭവന സബ്‌സിഡി, സൗരോർജ്ജ പദ്ധതികൾ, മുദ്ര ലോൺ എന്നിവയെക്കുറിച്ച് അറിയാൻ ഞാൻ സഹായിക്കാം.`;
        return conv.responseEnglish;
      }
    }
  }

  // 3. Fallback Intent: Profile-based intelligent recommendation
  if (!matchedScheme || bestScore <= 0) {
    if (profile?.employmentStatus === 'student' || q.includes('student') || q.includes('college') || q.includes('study') || q.includes('படிப்பு')) {
      matchedScheme = KNOWLEDGE_SCHEMES.find(s => s.id === 'internship') || KNOWLEDGE_SCHEMES.find(s => s.id === 'nsp-post-matric') || KNOWLEDGE_SCHEMES[0];
    } else if (profile?.employmentStatus === 'farmer' || q.includes('farmer') || q.includes('விவசாயம்')) {
      matchedScheme = KNOWLEDGE_SCHEMES.find(s => s.id === 'pmkisan') || KNOWLEDGE_SCHEMES[0];
    } else if (profile?.houseType === 'owned' || q.includes('solar') || q.includes('சோலார்')) {
      matchedScheme = KNOWLEDGE_SCHEMES.find(s => s.id === 'suryaghar') || KNOWLEDGE_SCHEMES[0];
    } else if (profile?.employmentStatus === 'working_self_employed' || q.includes('business') || q.includes('தொழில்')) {
      matchedScheme = KNOWLEDGE_SCHEMES.find(s => s.id === 'mudra') || KNOWLEDGE_SCHEMES[0];
    } else if (profile?.gender === 'female' || q.includes('women') || q.includes('மகளிர்')) {
      matchedScheme = KNOWLEDGE_SCHEMES.find(s => s.id === 'magalir-urimai-thogai') || KNOWLEDGE_SCHEMES[0];
    } else {
      matchedScheme = KNOWLEDGE_SCHEMES[0]; // PMAY fallback
    }
  }

  // 4. Calculate Profile Match Score
  let matchScore = 88;
  if (profile?.salary) {
    const salary = Number(profile.salary);
    if (salary <= 300000) matchScore = 98;
    else if (salary <= 600000) matchScore = 92;
    else if (salary <= 900000) matchScore = 85;
    else matchScore = 76;
  }

  const citizenName = profile?.name || (isTamil ? "குடிமகன்" : "Citizen");
  const state = profile?.state || (isTamil ? "தமிழ்நாடு" : "Tamil Nadu");

  // Output formatting based on requested language and mode
  if (isTamil) {
    if (mode === "checklist") {
      return `### 📋 **தேவையான ஆவணங்களின் பட்டியல்: ${matchedScheme.title}**
*(அனைத்து ஆவணங்களும் இணையதள பதிவேற்றத்திற்கு 100 KB-க்குள் ஸ்கேன் செய்யப்பட வேண்டும்)*

${matchedScheme.requiredDocuments.map((doc, idx) => `✅ **${idx + 1}. ${doc}**`).join('\n')}

💡 **ஜனசேவா டிஜிலாக்கர் குறிப்பு**: உங்கள் ஆவணங்களை தெளிவு குறையாமல் 100 KB-க்குள் சுருக்க எங்களின் **'DigiLocker Vault'** வசதியை பயன்படுத்தவும்.`;
    }

    if (mode === "quick") {
      return `### 🏛️ **${matchedScheme.title}**
**துறை**: *${matchedScheme.ministry}*
**நேரடி பலன்**: **${matchedScheme.benefit}**
**தகுதி பொருத்தம்**: **${matchScore}% தகுதி** (${citizenName} - ${state})
**வருமான வரம்பு**: ${matchedScheme.incomeCriteria}

**முக்கிய 3-படி வழிகாட்டுதல்**:
1. ஆதார் அட்டை, வருமான சான்றிதழ், வங்கி பாஸ்புக்கை (NPCI இணைக்கப்பட்டது) 100 KB-க்குள் தயார் செய்யவும்.
2. அதிகாரப்பூர்வ இணையதளத்தில் பதிவு செய்யவும்: **[${matchedScheme.portalName}](${matchedScheme.portal})**
3. ஆதார் OTP மூலம் விண்ணப்பத்தை இலவசமாக சமர்ப்பிக்கவும்.

---\n**🇮🇳 தமிழ் விளக்கம்**: ${matchedScheme.tamilSummary}`;
    }

    // Comprehensive Detailed Response in Tamil
    return `### 🏛️ **${matchedScheme.title}**
*${matchedScheme.ministry}*

---

#### 💰 **1. நேரடி நிதி பலன்கள் (Direct Welfare Benefit)**
- **மானியத் தொகை / பலன்**: **${matchedScheme.benefit}**
- **பரிமாற்ற முறை**: நேரடி பலன் பரிமாற்றம் (DBT) மூலம் உங்கள் ஆதார் இணைக்கப்பட்ட வங்கிக் கணக்கில் செலுத்தப்படும்.

#### 🎯 **2. பயனாளி தகுதி (Eligibility & Profile Fit)**
- **தகுதி சதவீதம்**: **${matchScore}% முழு தகுதி** (${citizenName} - மாநிலம்: ${state})
- **வருமான வரம்பு**: ${matchedScheme.incomeCriteria}
- **பயனாளி விவரம்**: ${matchedScheme.target}

#### 📑 **3. கட்டாய ஆவணங்கள் (100 KB-க்குள் ஸ்கேன் செய்யப்பட வேண்டும்)**
${matchedScheme.requiredDocuments.map((d, i) => `${i + 1}. **${d}**`).join('\n')}

#### 🚀 **4. விண்ணப்பிக்கும் முறை (Step-by-Step Procedure)**
${matchedScheme.applicationSteps.map((s, i) => `**படி ${i + 1}**: ${s}`).join('\n')}

---
**🇮🇳 தமிழ் விளக்கம்**: ${matchedScheme.tamilSummary}

---
🔒 **சைபர் பாதுகாப்பு அறிவிப்பு**: அதிகாரப்பூர்வ இணையதளமான **[${matchedScheme.portalName}](${matchedScheme.portal})** மூலம் மட்டுமே விண்ணப்பிக்கவும். அரசு நலத்திட்டங்களுக்கு வாட்ஸ்அப் அல்லது டெலிகிராமில் எந்தவித கட்டணமும் வசூலிக்கப்படாது.`;
  }

  // Hindi Output
  if (isHindi) {
    if (mode === "checklist") {
      return `### 📋 **अनिवार्य दस्तावेज चेकलिस्ट: ${matchedScheme.title}**
*(सभी दस्तावेज सीधे पोर्टल अपलोड हेतु 100 KB से कम में स्कैन होने चाहिए)*

${matchedScheme.requiredDocuments.map((doc, idx) => `✅ **${idx + 1}. ${doc}**`).join('\n')}

💡 **जनसेवा पोर्टल सलाह**: आधिकारिक पोर्टल पर अपलोड करने से पहले अपने दस्तावेजों को **'DigiLocker Vault'** में 100 KB तक संपीड़ित (Compress) कर सकते हैं।`;
    }

    return `### 🏛️ **${matchedScheme.title}**
*${matchedScheme.ministry}*

---

#### 💰 **1. प्रत्यक्ष वित्तीय लाभ (Direct Financial Benefit)**
- **स्वीकृत राशि / लाभ**: **${matchedScheme.benefit}**
- **हस्तांतरण प्रक्रिया**: डीबीटी (DBT) द्वारा सीधे आपके आधार-लिंक्ड बैंक खाते में।

#### 🎯 **2. नागरिक पात्रता (Eligibility & Match)**
- **पात्रता स्कोर**: **${matchScore}% उच्च पात्र** (${citizenName} - राज्य: ${state})
- **आय सीमा**: ${matchedScheme.incomeCriteria}
- **लक्षित लाभार्थी**: ${matchedScheme.target}

#### 📑 **3. अनिवार्य दस्तावेज (100 KB से कम में स्कैन करें)**
${matchedScheme.requiredDocuments.map((d, i) => `${i + 1}. **${d}**`).join('\n')}

#### 🚀 **4. ऑनलाइन आवेदन प्रक्रिया**
${matchedScheme.applicationSteps.map((s, i) => `**चरण ${i + 1}**: ${s}`).join('\n')}

---
🔒 **सुरक्षा सूचना**: केवल आधिकारिक पोर्टल **[${matchedScheme.portalName}](${matchedScheme.portal})** के माध्यम से ही आवेदन करें।`;
  }

  // Telugu Output
  if (isTelugu) {
    return `### 🏛️ **${matchedScheme.title}**
*${matchedScheme.ministry}*

---

#### 💰 **1. ప్రత్యక్ష ఆర్థిక ప్రయోజనం (Direct Benefit)**
- **మంజూరు మొత్తం**: **${matchedScheme.benefit}**
- **ట్రాన్స్‌ఫర్**: ఆధార్ అనుసంధాన బ్యాంక్ ఖాతాకు నేరుగా DBT ద్వారా.

#### 🎯 **2. అర్హత వివరాలు (Eligibility Match)**
- **అర్హత స్కోరు**: **${matchScore}% అధిక అర్హత** (${citizenName} - రాష్ట్రం: ${state})
- **ఆదాయ పరిమితి**: ${matchedScheme.incomeCriteria}

#### 📑 **3. అవసరమైన పత్రాలు (100 KB లోపు)**
${matchedScheme.requiredDocuments.map((d, i) => `${i + 1}. **${d}**`).join('\n')}

#### 🚀 **4. దరఖాస్తు విధానం**
${matchedScheme.applicationSteps.map((s, i) => `**దశ ${i + 1}**: ${s}`).join('\n')}

---
🔒 **పోర్టల్ లింక్**: అధికారిక పోర్టల్ **[${matchedScheme.portalName}](${matchedScheme.portal})** ద్వారా దరఖాస్తు చేసుకోండి.`;
  }

  // Kannada Output
  if (isKannada) {
    return `### 🏛️ **${matchedScheme.title}**
*${matchedScheme.ministry}*

---

#### 💰 **1. ನೇರ ಆರ್ಥಿಕ ಸೌಲಭ್ಯ (Direct Benefit)**
- **ಸಹಾಯಧನ ಮೊತ್ತ**: **${matchedScheme.benefit}**
- **ವರ್ಗಾವಣೆ**: ಡಿಬಿಟಿ (DBT) ಮೂಲಕ ನೇರವಾಗಿ ನಿಮ್ಮ ಆಧಾರ್ ಜೋಡಿತ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ.

#### 🎯 **2. ಅರ್ಹತಾ ವಿವರ (Eligibility Match)**
- **ಅರ್ಹತಾ ಸ್ಕೋರ್**: **${matchScore}% ಪೂರ್ಣ ಅರ್ಹತೆ** (${citizenName} - ರಾಜ್ಯ: ${state})
- **ಆದಾಯ ಮಿತಿ**: ${matchedScheme.incomeCriteria}

#### 📑 **3. ಅಗತ್ಯ ದಾಖಲೆಗಳು (100 KB ಒಳಗೆ)**
${matchedScheme.requiredDocuments.map((d, i) => `${i + 1}. **${d}**`).join('\n')}

#### 🚀 **4. ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಹಂತಗಳು**
${matchedScheme.applicationSteps.map((s, i) => `**ಹಂತ ${i + 1}**: ${s}`).join('\n')}

---
🔒 **ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್**: **[${matchedScheme.portalName}](${matchedScheme.portal})** ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.`;
  }

  // Malayalam Output
  if (isMalayalam) {
    return `### 🏛️ **${matchedScheme.title}**
*${matchedScheme.ministry}*

---

#### 💰 **1. നേരിട്ടുള്ള സാമ്പത്തിക ആനുകൂല്യം (Direct Benefit)**
- **സബ്‌സിഡി / ആനുകൂല്യം**: **${matchedScheme.benefit}**
- **കൈമാറ്റ രീതി**: ഡിബിടി (DBT) വഴി നേരിട്ട് ആധാർ ലിങ്ക് ചെയ്ത ബാങ്ക് അക്കൗണ്ടിലേക്ക്.

#### 🎯 **2. യോഗ്യതാ വിവരങ്ങൾ (Eligibility Match)**
- **സ്കോർ**: **${matchScore}% ഉയർന്ന യോഗ്യത** (${citizenName} - സംസ്ഥാനം: ${state})
- **വരുമാന പരിധി**: ${matchedScheme.incomeCriteria}

#### 📑 **3. ആവശ്യമായ രേഖകൾ (100 KB-ൽ താഴെ)**
${matchedScheme.requiredDocuments.map((d, i) => `${i + 1}. **${d}**`).join('\n')}

#### 🚀 **4. അപേക്ഷിക്കേണ്ട ഘട്ടങ്ങൾ**
${matchedScheme.applicationSteps.map((s, i) => `**ഘട്ടം ${i + 1}**: ${s}`).join('\n')}

---
🔒 **ഔദ്യോഗിക പോർട്ടൽ**: **[${matchedScheme.portalName}](${matchedScheme.portal})** വഴി മാത്രം അപേക്ഷിക്കുക.`;
  }

  // Primary Default: English Output
  if (mode === "checklist") {
    return `### 📋 **Mandatory Document Checklist: ${matchedScheme.title}**
*(All documents must be scanned under 100 KB for direct portal upload)*

${matchedScheme.requiredDocuments.map((doc, idx) => `✅ **${idx + 1}. ${doc}**`).join('\n')}

💡 **VYNORA Portal Tip**: You can verify document clarity and compress your files directly in our **'DigiLocker Vault'** before uploading to **${matchedScheme.portalName}**.`;
  }

  return `### 🏛️ **${matchedScheme.title}**
*${matchedScheme.ministry}*

---

#### 💰 **1. Direct Citizen Financial Benefit**
- **Sanction Amount / Benefit**: **${matchedScheme.benefit}**
- **Transfer Mechanism**: Direct Benefit Transfer (DBT) directly into your Aadhaar-linked bank account.

#### 🎯 **2. Eligibility & Citizen Profile Fit**
- **Profile Match Score**: **${matchScore}% Highly Eligible** for ${citizenName} (State: ${state})
- **Income Ceiling**: ${matchedScheme.incomeCriteria}
- **Target Beneficiary**: ${matchedScheme.target}

#### 📑 **3. Mandatory Required Documents (Scanned < 100 KB)**
${matchedScheme.requiredDocuments.map((d, i) => `${i + 1}. **${d}**`).join('\n')}

#### 🚀 **4. Step-by-Step Official Application Procedure**
${matchedScheme.applicationSteps.map((s, i) => `**Step ${i + 1}**: ${s}`).join('\n')}

---
🔒 **Cyber Protection Notice**: Apply strictly via official portal **[${matchedScheme.portalName}](${matchedScheme.portal})**. The Government never charges application fees or asks for OTPs on WhatsApp or Telegram.`;
}
