import React, { useState, useEffect } from 'react';
import { FarmProfileData, PageId } from '../types/farmhub';
import { generateRecommendations } from '../services/intelligenceEngine';
import { MARKET_DATA, EMERGENCY_SCENARIO, SCHEMES_DATA } from '../data/centralData';
import { useLanguage } from '../context/LanguageContext';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  HelpCircle, 
  BrainCircuit, 
  AlertTriangle, 
  TrendingUp, 
  Landmark, 
  RotateCcw,
  CheckCircle2,
  Volume2,
  ArrowRight,
  ShieldAlert,
  Info,
  DollarSign,
  Sprout,
  Compass
} from 'lucide-react';

interface AIAssistantProps {
  farmProfile: FarmProfileData;
  setCurrentPage?: (page: PageId) => void;
}

interface AssistantAction {
  label: string;
  page: PageId;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  dataCard?: {
    title: string;
    points: string[];
    tag?: string;
  };
  actions?: AssistantAction[];
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ farmProfile, setCurrentPage }) => {
  const { language, t } = useLanguage();
  const [inputQuery, setInputQuery] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const getInitialMessage = (lang: string): Message => ({
    id: 'msg-welcome',
    sender: 'assistant',
    text: lang === 'hi' 
      ? `नमस्ते ${farmProfile.farmerName} जी! मैं फार्महब एआई हूँ, ${farmProfile.location} में आपकी ${farmProfile.farmArea} एकड़ ${farmProfile.soilType} मिट्टी की खेती के लिए समर्पित कृषि सलाहकार। मैं फार्महब के निर्णय इंजन (मिट्टी, मौसम, मंडी मांग, आवक व जोखिम) के आधार पर सटीक सलाह प्रदान करता हूँ।`
      : `Namaste ${farmProfile.farmerName} ji! I am FarmHub AI, your dedicated agronomic decision assistant for your ${farmProfile.farmArea}-acre ${farmProfile.soilType.toLowerCase()} farm in ${farmProfile.location}. I interpret FarmHub's structured decision engine (soil compatibility, mandi demand, price elasticity, and risk matrices) into clear actionable answers.`,
    timestamp: 'Just now',
    actions: [
      { label: t.actionOpenIntel, page: 'intelligence' },
      { label: t.actionOpenEmergency, page: 'emergency' }
    ]
  });

  const [messages, setMessages] = useState<Message[]>([getInitialMessage(language)]);

  // Reset welcome message when language changes
  useEffect(() => {
    setMessages([getInitialMessage(language)]);
  }, [language]);

  const suggestedQuestionsEn = [
    'What should I grow on my 5-acre Agra farm?',
    'How much can I earn with Mustard vs Chickpea?',
    'Should I sell my potatoes now or hold?',
    'Heavy rain is coming. What should I do?',
    'What do you know about my farm profile?',
    'What government schemes apply to me?'
  ];

  const suggestedQuestionsHi = [
    'मेरे ५ एकड़ खेत में आलू के बाद क्या उगाना चाहिए?',
    'सरसों और चने में कितना मुनाफा हो सकता है?',
    'क्या मुझे अभी आलू बेचना चाहिए या रुकना चाहिए?',
    'भारी बारिश की चेतावनी पर मुझे तुरंत क्या करना चाहिए?',
    'आप मेरे खेत के बारे में क्या जानते हैं?',
    'मेरे खेत के लिए कौन-सी सरकारी सब्सिडी मिलेगी?'
  ];

  const suggestedQuestions = language === 'hi' ? suggestedQuestionsHi : suggestedQuestionsEn;

  // Web Speech API Integration
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text.replace(/[*#]/g, ''));
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = (queryText?: string) => {
    const query = queryText || inputQuery;
    if (!query.trim()) return;

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!queryText) setInputQuery('');

    // Generate grounded structured answer
    setTimeout(() => {
      const response = generateStructuredAnswer(query, farmProfile, language);
      setMessages(prev => [...prev, response]);
    }, 350);
  };

  const generateStructuredAnswer = (q: string, farm: FarmProfileData, lang: string): Message => {
    const lower = q.toLowerCase();
    const intel = generateRecommendations(farm, 0);
    const top = intel.topRecommendations[0];
    const second = intel.topRecommendations[1];
    const potatoMkt = MARKET_DATA.find(m => m.crop.toLowerCase().includes('potato')) || MARKET_DATA[1];

    // Intent 1: Crop Decision
    if (lower.includes('grow') || lower.includes('crop') || lower.includes('उगाना') || lower.includes('फसल') || lower.includes('recommend')) {
      if (lang === 'hi') {
        return {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: `फार्महब के बहु-कारकीय निर्णय इंजन के अनुसार, ${farm.location} में आपकी **${farm.farmArea} एकड़ ${farm.soilType} मिट्टी** और **${farm.previousCrop} की पूर्व फसल** के आधार पर **${top.hindiName} (${top.name})** को #१ स्थान दिया गया है, जिसके बाद **${second.hindiName}** #२ स्थान पर है।`,
          timestamp: 'Just now',
          dataCard: {
            title: `${farm.farmArea} एकड़ खेत हेतु अनुशंसित फसलें`,
            tag: 'फार्महब निर्णय एल्गोरिदम',
            points: [
              `शीर्ष पसंद: ${top.hindiName} - समग्र स्कोर ${top.score}/१०० (उपयुक्तता: ${top.soilSuitabilityScore}%)।`,
              `अनुमानित ५ एकड़ शुद्ध मुनाफा: ₹${top.expectedProfitMin?.toLocaleString('en-IN')} – ₹${top.expectedProfitMax?.toLocaleString('en-IN')}।`,
              `क्षेत्रीय मांग: ${top.regionalDemandIndex}/१०० (आगरा तेल मिलों में इन्वेंट्री कमी के कारण उच्च मांग)।`,
              `फसल चक्र लाभ: ${farm.previousCrop} के बाद कीट चक्र तोड़ता है व ४०% कम पानी लेता है।`
            ]
          },
          actions: [
            { label: t.actionOpenIntel, page: 'intelligence' }
          ]
        };
      }

      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: `Based on FarmHub's decision engine for your ${farm.farmArea}-acre ${farm.soilType.toLowerCase()} soil farm in ${farm.location} following ${farm.previousCrop}, **${top.name}** is ranked #1, followed by **${second.name}**.`,
        timestamp: 'Just now',
        dataCard: {
          title: `Ranked Recommendation Breakdown for ${farm.farmArea} Acres`,
          tag: 'FarmHub Decision Algorithm',
          points: [
            `Top Choice: ${top.name} (${top.hindiName}) with a composite score of ${top.score}/100 (${top.soilSuitabilityScore}% suitability).`,
            `Expected 5-Acre Profit Range: ₹${top.expectedProfitMin?.toLocaleString('en-IN')} – ₹${top.expectedProfitMax?.toLocaleString('en-IN')}.`,
            `Regional Demand Index: ${top.regionalDemandIndex}/100 (high crusher demand in Agra district).`,
            `Rotation Synergy: Excellent disease-break cycle following ${farm.previousCrop} with 40% less water usage.`
          ]
        },
        actions: [
          { label: t.actionOpenIntel, page: 'intelligence' }
        ]
      };
    }

    // Intent 2: Profit Calculation
    if (lower.includes('earn') || lower.includes('profit') || lower.includes('cost') || lower.includes('मुनाफा') || lower.includes('कमाई') || lower.includes('लागत')) {
      if (lang === 'hi') {
        return {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: `आपकी ${farm.farmArea} एकड़ जमीन पर फार्महब का लागत-मुनाफा विश्लेषण:`,
          timestamp: 'Just now',
          dataCard: {
            title: `${farm.farmArea} एकड़ आर्थिक लाभ एवं लागत तुलना`,
            tag: 'फार्महब लाभ मॉडल',
            points: [
              `${top.hindiName}: ५ एकड़ शुद्ध मुनाफा **₹${top.expectedProfitMin?.toLocaleString('en-IN')} – ₹${top.expectedProfitMax?.toLocaleString('en-IN')}** (उपज: ~${top.expectedYield} क्विंटल, मंडी भाव: ₹५,९५०/क्विंटल)।`,
              `${second.hindiName}: ५ एकड़ शुद्ध मुनाफा **₹${second.expectedProfitMin?.toLocaleString('en-IN')} – ₹${second.expectedProfitMax?.toLocaleString('en-IN')}** (उपज: ~${second.expectedYield} क्विंटल, मंडी भाव: ₹५,६००/क्विंटल)।`,
              `उत्पादन लागत: ${top.hindiName} (~₹${top.expectedCost?.toLocaleString('en-IN')}) बनाम ${second.hindiName} (~₹${second.expectedCost?.toLocaleString('en-IN')})।`,
              `निष्कर्ष: तेल मिलों में उच्च मांग के कारण सरसों लगाने पर चने की अपेक्षा लगभग ₹१५,००० से ₹२२,००० अधिक शुद्ध बचत होगी।`
            ]
          },
          actions: [
            { label: t.actionOpenIntel, page: 'intelligence' },
            { label: t.actionOpenMarket, page: 'market' }
          ]
        };
      }

      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: `Here is the financial margin breakdown calculated specifically for your ${farm.farmArea} acres:`,
        timestamp: 'Just now',
        dataCard: {
          title: `5-Acre Net Margin Comparison`,
          tag: 'FarmHub Cost-Profit Model',
          points: [
            `${top.name}: Expected Net Profit **₹${top.expectedProfitMin?.toLocaleString('en-IN')} – ₹${top.expectedProfitMax?.toLocaleString('en-IN')}** (Yield: ~${top.expectedYield} Quintals, Rate: ₹5,950/q).`,
            `${second.name}: Expected Net Profit **₹${second.expectedProfitMin?.toLocaleString('en-IN')} – ₹${second.expectedProfitMax?.toLocaleString('en-IN')}** (Yield: ~${second.expectedYield} Quintals, Rate: ₹5,600/q).`,
            `Cultivation Cost: ${top.name} (~₹${top.expectedCost?.toLocaleString('en-IN')}) vs ${second.name} (~₹${second.expectedCost?.toLocaleString('en-IN')}).`,
            `Financial Finding: Mustard yields ₹15,000–₹22,000 higher net profit due to oil mill crushing shortages in Agra.`
          ]
        },
        actions: [
          { label: t.actionOpenIntel, page: 'intelligence' },
          { label: t.actionOpenMarket, page: 'market' }
        ]
      };
    }

    // Intent 3: Rain & Emergency Response
    if (lower.includes('rain') || lower.includes('emergency') || lower.includes('बारिश') || lower.includes('आपात') || lower.includes('मौसम') || lower.includes('आलू') || lower.includes('sell')) {
      if (lang === 'hi') {
        return {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: `🚨 **गंभीर मौसम चेतावनी**: मौसम विभाग ने **अगले ३६-४८ घंटों में ८५ मिमी बारिश** का अलर्ट जारी किया है। आपकी **आलू की फसल ${farm.harvestReadinessPercent}% पक चुकी है**; खेत में जलभराव से जीवाणु सड़न का भारी खतरा है।`,
          timestamp: 'Just now',
          dataCard: {
            title: '५ एकड़ आलू फसल बचाव हेतु फार्महब आपातकालीन योजना',
            tag: 'तत्काल कार्रवाई: अगले ३६ घंटे',
            points: [
              '१. अगले ६ घंटे में २ ट्रैक्टर डिगर से यंत्रीकृत खुदाई प्रारंभ करें।',
              '२. खेत में मिट्टी गीली होने से पूर्व १० मजदूरों का दल लगाकर आलू की छंटाई व बोरी भराई कराएं।',
              '३. मंडी जलभराव से बचने हेतु सीधे फूड प्रोसेसर (पेप्सिको) को खेत के गेट पर ₹१,३८०/क्विंटल पर offload कराएं।',
              '४. खेत से सीधे बेचने पर ५ एकड़ पर ₹१,५३,१२५ का अतिरिक्त शुद्ध लाभ होता है।'
            ]
          },
          actions: [
            { label: t.actionOpenEmergency, page: 'emergency' },
            { label: t.actionOpenMarket, page: 'market' }
          ]
        };
      }

      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: `🚨 **Critical Alert Active**: IMD forecasts **85mm of heavy rainfall within 36–48 hours** in Agra district. Because your Potato crop has reached **${farm.harvestReadinessPercent}% maturity**, waterlogging will trigger rapid tuber rot.`,
        timestamp: 'Just now',
        dataCard: {
          title: 'FarmHub Emergency Protocol for Potato (5 Acres)',
          tag: 'Action Plan: Next 36 Hours',
          points: [
            '1. Harvest immediately using 2 mechanized potato diggers (clears 5 acres in 6 hrs).',
            '2. Mobilize 10 farmhands for field picking and sorting before mud sets in.',
            '3. Offload directly to chip processors (Pepsico) at ₹1,380/q fieldgate to bypass flooded mandis.',
            '4. Direct buyer selling saves ₹1,53,125 in net bank payout over mandi middleman commission.'
          ]
        },
        actions: [
          { label: t.actionOpenEmergency, page: 'emergency' },
          { label: t.actionOpenMarket, page: 'market' }
        ]
      };
    }

    // Intent 4: Farm Profile Query
    if (lower.includes('profile') || lower.includes('know') || lower.includes('farm') || lower.includes('प्रोफ़ाइल') || lower.includes('खेत') || lower.includes('डेटा')) {
      if (lang === 'hi') {
        return {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: `फार्महब के पास दर्ज आपकी canonical खेत प्रोफ़ाइल का ब्योरा:`,
          timestamp: 'Just now',
          dataCard: {
            title: `किसान प्रोफ़ाइल: ${farm.farmerName}`,
            tag: 'खेत संदर्भ डेटा',
            points: [
              `स्थान: ${farm.location} | कुल रकबा: ${farm.farmArea} एकड़`,
              `मिट्टी का प्रकार: ${farm.soilType} | जल व्यवस्था: ${farm.waterAvailability}`,
              `पिछली फसल: ${farm.previousCrop} | वर्तमान फसल: ${farm.currentCrop} (${farm.harvestReadinessPercent}% परिपक्व)`
            ]
          },
          actions: [
            { label: t.actionOpenProfile, page: 'profile' }
          ]
        };
      }

      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: `Here is the canonical farm profile stored in FarmHub for your account:`,
        timestamp: 'Just now',
        dataCard: {
          title: `Farmer Context: ${farm.farmerName}`,
          tag: 'Canonical Profile Data',
          points: [
            `Location: ${farm.location} | Total Acreage: ${farm.farmArea} Acres`,
            `Soil Type: ${farm.soilType} | Water Access: ${farm.waterAvailability}`,
            `Previous Crop: ${farm.previousCrop} | Current Crop: ${farm.currentCrop} (${farm.harvestReadinessPercent}% Mature)`
          ]
        },
        actions: [
          { label: t.actionOpenProfile, page: 'profile' }
        ]
      };
    }

    // Intent 5: Government Schemes
    if (lower.includes('scheme') || lower.includes('subsidy') || lower.includes('योजना') || lower.includes('सब्सिडी') || lower.includes('सरकारी')) {
      if (lang === 'hi') {
        return {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: `आपकी ५ एकड़ दोमट मिट्टी के लिए फार्महब द्वारा सुझाई गई शीर्ष सरकारी योजनाएं:`,
          timestamp: 'Just now',
          dataCard: {
            title: 'आपके खेत हेतु उपयुक्त सरकारी सब्सिडी',
            tag: 'सरकारी योजना पोर्टल',
            points: [
              '१. पीएमकेएसवाई (सूक्ष्म सिंचाई): ५ एकड़ खेत पर ड्रिप लगाने पर ५५% तक अनुदान।',
              '२. पीएमएफबीवाई (फसल बीमा): रबी फसलों के लिए मात्र १.५% प्रीमियम पर भारी वर्षा व ओलावृष्टि से सुरक्षा।',
              '३. स्मैम (कृषि यंत्रीकरण): ट्रैक्टर आलू डिगर और लेजर लैंड लेवलर पर ४०-५०% छूट।',
              '४. पीएम-किसान सम्मान निधि: सालाना ₹६,००० की प्रत्यक्ष नकद सहायता।'
            ]
          },
          actions: [
            { label: t.actionOpenSchemes, page: 'schemes' }
          ]
        };
      }

      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: `For your 5-acre irrigated farm in Agra, FarmHub has matched 4 government programs:`,
        timestamp: 'Just now',
        dataCard: {
          title: 'Matched Agricultural Subsidies (Agra District)',
          tag: 'Government Schemes Portal',
          points: [
            '1. PMKSY (Micro-Irrigation): Up to 55% subsidy on Drip installation for your 5 acres.',
            '2. PMFBY (Crop Insurance): Premium is only 1.5% for Rabi crops against unseasonal rainfall.',
            '3. SMAM (Mechanization): 40-50% subsidy on tractor potato diggers.',
            '4. PM-KISAN: ₹6,000 annual direct income support.'
          ]
        },
        actions: [
          { label: t.actionOpenSchemes, page: 'schemes' }
        ]
      };
    }

    // Default intelligent response
    return {
      id: `ai-${Date.now()}`,
      sender: 'assistant',
      text: lang === 'hi'
        ? `मैंने आगरा में आपके ${farm.farmArea} एकड़ खेत के डेटा के आधार पर प्रश्न का विश्लेषण किया है। वर्तमान में **सरसों** और **चना** सबसे सुरक्षित व लाभदायक फसलें हैं, जबकि खेत में खड़ी **आलू की फसल (${farm.harvestReadinessPercent}% परिपक्व)** को ८५ मिमी बारिश के खतरे से बचाने हेतु तुरंत कटाई अनिवार्य है।`
        : `I've analyzed your question against FarmHub's live decision engine for your ${farm.farmArea}-acre farm in ${farm.location}. Current parameters indicate **Mustard** and **Chickpea** offer optimal risk-adjusted returns, while the standing **Potato crop (${farm.harvestReadinessPercent}% mature)** requires immediate harvest due to the 85mm rainfall warning.`,
      timestamp: 'Just now',
      actions: [
        { label: t.actionOpenIntel, page: 'intelligence' },
        { label: t.actionOpenEmergency, page: 'emergency' }
      ]
    };
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Context Badge Header Bar */}
      <div className="bg-stone-900 text-white p-4 rounded-3xl border border-stone-800 shadow-md flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-extrabold text-emerald-400 uppercase tracking-wider">{t.aiContextBadge}:</span>
          <span className="text-stone-300 font-bold">{farmProfile.farmerName} • {farmProfile.location} • {farmProfile.farmArea} Acres ({farmProfile.soilType})</span>
        </div>

        <span className="text-[10px] text-stone-400 font-medium px-2.5 py-0.5 rounded-full bg-stone-800 border border-stone-700">
          {t.aiSourceNotice}
        </span>
      </div>

      {/* Main Assistant Header */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-800">
              <Bot className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900">
              {t.aiTitle}
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {t.aiSub}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {isSpeaking && (
            <span className="text-xs text-indigo-600 font-extrabold flex items-center space-x-1 animate-pulse">
              <Volume2 className="w-4 h-4" />
              <span>{language === 'hi' ? 'बोल रहा है...' : 'Speaking...'}</span>
            </span>
          )}
          <button
            onClick={() => setMessages([getInitialMessage(language)])}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-50 text-xs font-bold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.clearChatBtn}</span>
          </button>
        </div>
      </div>

      {/* Suggested Question Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-[11px] font-bold text-stone-400 whitespace-nowrap">{t.suggestedLabel}</span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 text-xs font-semibold whitespace-nowrap transition-colors border border-stone-200 cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Box */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs min-h-[420px] max-h-[550px] overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div 
              key={msg.id}
              className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold shadow-2xs ${
                isUser 
                  ? 'bg-emerald-700 text-white' 
                  : 'bg-indigo-600 text-white'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[85%] sm:max-w-[78%] space-y-2`}>
                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-emerald-700 text-white font-medium rounded-tr-none'
                    : 'bg-stone-50 border border-stone-200 text-stone-800 rounded-tl-none font-normal'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Structured Data Card inside response */}
                {msg.dataCard && (
                  <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-300 space-y-2 text-xs">
                    <div className="flex items-center justify-between border-b border-emerald-200 pb-1.5">
                      <span className="font-black text-emerald-950">{msg.dataCard.title}</span>
                      {msg.dataCard.tag && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                          {msg.dataCard.tag}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 text-stone-700">
                      {msg.dataCard.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start space-x-2">
                          <span className="text-emerald-700 font-bold">•</span>
                          <span className="leading-snug">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contextual Navigation Action Buttons */}
                {!isUser && msg.actions && setCurrentPage && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {msg.actions.map((act, aIdx) => (
                      <button
                        key={aIdx}
                        onClick={() => setCurrentPage(act.page)}
                        className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1 shadow-2xs"
                      >
                        <span>{act.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div className={`flex items-center space-x-2 text-[10px] text-stone-400 px-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => speakText(msg.text)}
                      className="hover:text-indigo-600 cursor-pointer"
                      title="Read aloud"
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Bar */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="bg-white p-3 rounded-2xl border border-stone-300 shadow-sm flex items-center space-x-2"
      >
        <input
          type="text"
          placeholder={t.inputPlaceholder}
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          className="flex-1 text-xs sm:text-sm p-2 bg-transparent focus:outline-none text-stone-900"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim()}
          className="p-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white disabled:opacity-40 transition-all cursor-pointer shadow-xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
