import React, { useState, useEffect } from 'react';
import { FarmProfileData } from '../types/farmhub';
import { generateRecommendations } from '../services/intelligenceEngine';
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
  CheckCircle2
} from 'lucide-react';

interface AIAssistantProps {
  farmProfile: FarmProfileData;
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
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ farmProfile }) => {
  const { language, t } = useLanguage();
  const [inputQuery, setInputQuery] = useState('');
  
  const getInitialMessage = (lang: string): Message => ({
    id: 'msg-welcome',
    sender: 'assistant',
    text: lang === 'hi' 
      ? `नमस्ते रमेश जी! मैं फार्महब एआई हूँ, आगरा में आपकी ${farmProfile.farmArea} एकड़ दोमट मिट्टी की खेती के लिए समर्पित कृषि सलाहकार। मैं फार्महब के मिट्टी, मौसम, मांग, आवक और जोखिम के वैज्ञानिक डेटा के आधार पर सटीक निर्णय लेने में आपकी मदद करता हूँ। आज मैं आपकी क्या सहायता कर सकता हूँ?`
      : `Namaste Ramesh ji! I am FarmHub AI, your dedicated agronomic decision assistant for your ${farmProfile.farmArea}-acre farm in ${farmProfile.location}. I interpret FarmHub's structured intelligence algorithms (soil suitability, mandi demand, price elasticity, and risk matrices) into clear actionable answers. How can I help you today?`,
    timestamp: 'Just now'
  });

  const [messages, setMessages] = useState<Message[]>([getInitialMessage(language)]);

  // Reset welcome when language changes
  useEffect(() => {
    setMessages([getInitialMessage(language)]);
  }, [language]);

  const suggestedQuestionsEn = [
    'What should I grow on my 5-acre Agra farm?',
    'How much can I earn with Mustard vs Chickpea?',
    'What is the market outlook for Potato & Mustard?',
    'Heavy rain is coming. What should I do?',
    'What schemes may apply to me?'
  ];

  const suggestedQuestionsHi = [
    'मेरे ५ एकड़ खेत में क्या उगाना सबसे लाभदायक रहेगा?',
    'सरसों और चने में कितना मुनाफा हो सकता है?',
    'आगरा मंडी में आलू और सरसों का क्या रुझान है?',
    'भारी बारिश आने वाली है, मुझे तुरंत क्या करना चाहिए?',
    'मेरे खेत के लिए कौन-सी सरकारी सब्सिडी मिलेगी?'
  ];

  const suggestedQuestions = language === 'hi' ? suggestedQuestionsHi : suggestedQuestionsEn;

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
    }, 400);
  };

  const generateStructuredAnswer = (q: string, farm: FarmProfileData, lang: string): Message => {
    const lower = q.toLowerCase();
    const intel = generateRecommendations(farm, 0);
    const top = intel.topRecommendations[0];
    const second = intel.topRecommendations[1];

    if (lower.includes('what should i grow') || lower.includes('उगाना') || lower.includes('recommend') || lower.includes('फसल')) {
      if (lang === 'hi') {
        return {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: `फार्महब के बहु-कारकीय निर्णय इंजन के अनुसार, आगरा में आपकी **${farm.farmArea} एकड़ दोमट मिट्टी** और **गेहूं की पूर्व फसल** के बाद **सरसों (Pusa Bold)** को #१ रैंक दिया गया है, और इसके बाद **चना (JG-11 Desi)** दूसरे स्थान पर है।`,
          timestamp: 'Just now',
          dataCard: {
            title: `${farm.farmArea} एकड़ खेत हेतु रैंक की गई सिफारिशें`,
            tag: 'फार्महब निर्णय एल्गोरिदम',
            points: [
              `शीर्ष पसंद: सरसों (Pusa Bold) - समग्र स्कोर ${top.score}/१००।`,
              `मिट्टी अनुकूलता: दोमट मिट्टी व सिंचित व्यवस्था के साथ ${top.soilSuitabilityScore}% उपयुक्तता।`,
              `अनुमानित ५ एकड़ मुनाफा: ₹${top.expectedProfitMin?.toLocaleString('en-IN')} – ₹${top.expectedProfitMax?.toLocaleString('en-IN')}।`,
              `फसल चक्र लाभ: गेहूं के बाद मिट्टी के कीट चक्र को तोड़ता है और गेहूं की तुलना में ४०% कम पानी की खपत करता है।`
            ]
          }
        };
      }

      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: `Based on FarmHub's multi-factor decision engine for your ${farm.farmArea}-acre ${farm.soilType.toLowerCase()} soil farm in ${farm.location} following ${farm.previousCrop}, **${top.name}** is ranked #1, followed by **${second.name}**.`,
        timestamp: 'Just now',
        dataCard: {
          title: `Ranked Recommendation Breakdown for ${farm.farmArea} Acres`,
          tag: 'FarmHub Decision Algorithm',
          points: [
            `Top Choice: ${top.name} (${top.hindiName}) with score of ${top.score}/100.`,
            `Suitability: ${top.soilSuitabilityScore}% match for ${farm.soilType} soil and ${farm.waterAvailability.toLowerCase()} irrigation.`,
            `Expected 5-Acre Profit: ₹${top.expectedProfitMin?.toLocaleString('en-IN')} – ₹${top.expectedProfitMax?.toLocaleString('en-IN')}.`,
            `Rotation Synergy: Excellent disease-break cycle following ${farm.previousCrop} with 40% less water consumption than cereal crops.`
          ]
        }
      };
    }

    if (lower.includes('earn') || lower.includes('profit') || lower.includes('cost') || lower.includes('मुनाफा') || lower.includes('लागत') || lower.includes('कमाई')) {
      if (lang === 'hi') {
        return {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: `आपकी ५ एकड़ जमीन पर सरसों बनाम चना के आर्थिक मुनाफे का विस्तृत विश्लेषण:`,
          timestamp: 'Just now',
          dataCard: {
            title: '५ एकड़ आर्थिक लाभ एवं लागत तुलना',
            tag: 'फार्महब लागत-मुनाफा मॉडल',
            points: [
              `सरसों (Pusa Bold): ५ एकड़ शुद्ध मुनाफा ₹${top.expectedProfitMin?.toLocaleString('en-IN')} – ₹${top.expectedProfitMax?.toLocaleString('en-IN')} (उपज: ~${top.expectedYield} क्विंटल, मंडी भाव: ₹५,९५०/क्विंटल)।`,
              `चना (JG-11 Desi): ५ एकड़ शुद्ध मुनाफा ₹${second.expectedProfitMin?.toLocaleString('en-IN')} – ₹${second.expectedProfitMax?.toLocaleString('en-IN')} (उपज: ~${second.expectedYield} क्विंटल, मंडी भाव: ₹५,६००/क्विंटल)।`,
              `खेती लागत: सरसों (~₹${top.expectedCost?.toLocaleString('en-IN')}) बनाम चना (~₹${second.expectedCost?.toLocaleString('en-IN')})।`,
              `फार्महब निष्कर्ष: आगरा क्षेत्र में तेल मिलों की भारी मांग के कारण सरसों लगाने पर चने की अपेक्षा लगभग ₹१५,००० से ₹२२,००० अधिक शुद्ध बचत होगी।`
            ]
          }
        };
      }

      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: `Here is the financial margin comparison calculated specifically for your ${farm.farmArea} acres:`,
        timestamp: 'Just now',
        dataCard: {
          title: '5-Acre Economic Profitability Comparison',
          tag: 'FarmHub Cost-Profit Model',
          points: [
            `Mustard: Expected Net Profit ₹${top.expectedProfitMin?.toLocaleString('en-IN')} – ₹${top.expectedProfitMax?.toLocaleString('en-IN')} (Yield: ~${top.expectedYield} Quintals, Rate: ₹5,950/q).`,
            `Chickpea (Chana): Expected Net Profit ₹${second.expectedProfitMin?.toLocaleString('en-IN')} – ₹${second.expectedProfitMax?.toLocaleString('en-IN')} (Yield: ~${second.expectedYield} Quintals, Rate: ₹5,600/q).`,
            `Cost of Cultivation: Mustard (~₹${top.expectedCost?.toLocaleString('en-IN')}) vs Chickpea (~₹${second.expectedCost?.toLocaleString('en-IN')}).`,
            `Recommendation: Mustard yields ₹15,000–₹22,000 higher total return due to the current crushing shortage in Agra mandis.`
          ]
        }
      };
    }

    if (lower.includes('rain') || lower.includes('emergency') || lower.includes('बारिश') || lower.includes('आपात') || lower.includes('मौसम') || lower.includes('आलू')) {
      if (lang === 'hi') {
        return {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: `🚨 **गंभीर मौसम चेतावनी**: मौसम विभाग ने आगरा जिले में **अगले ३६-४८ घंटों में ८५ मिमी मूसलाधार बारिश** का अलर्ट जारी किया है। चूंकि आपकी आलू की फसल **${farm.harvestReadinessPercent}% पक चुकी है**, खेत में पानी भरने से कंदों में जीवाणु सड़न (सॉफ्ट रॉट) और फफूंद रोग लग जाएगा।`,
          timestamp: 'Just now',
          dataCard: {
            title: '५ एकड़ आलू फसल बचाव हेतु फार्महब आपातकालीन योजना',
            tag: 'तत्काल कार्रवाई: अगले ३६ घंटे',
            points: [
              '१. अगले ६ घंटे में ट्रैक्टर डिगर से तत्काल खुदाई प्रारंभ करें (६ घंटे में ५ एकड़ निकल जाएगा)।',
              '२. खेत में मिट्टी गीली होने से पूर्व १० मजदूरों का दल लगाकर आलू की छंटाई व बोरी भराई कराएं।',
              '३. आलू को तिरपाल से ढके शेड में रखें या खंडौली कोल्ड स्टोरेज के प्री-कूलिंग चैंबर में सुरक्षित करें।',
              '४. जलभराव वाली मंडियों के चक्कर से बचने के लिए खेत से ही सीधे फूड प्रोसेसर्स को ₹१,३२०/क्विंटल पर लोड कराएं।'
            ]
          }
        };
      }

      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: `🚨 **Critical Alert Active**: IMD has forecasted **85mm of heavy rainfall within 36–48 hours** in Agra district. Because your Potato crop has reached **${farm.harvestReadinessPercent}% maturity**, waterlogging will cause rapid soft rot (Erwinia) and fungal decay.`,
        timestamp: 'Just now',
        dataCard: {
          title: 'FarmHub Emergency Protocol for Potato (5 Acres)',
          tag: 'Action Plan: Next 36 Hours',
          points: [
            '1. Harvest immediately using mechanized potato diggers (saves 6-8 hrs).',
            '2. Mobilize 10 farmhands for field picking and sorting before mud sets in.',
            '3. Move tubers to covered sheds or reserve Khandauli Cold Storage bays.',
            '4. Sell directly to chip processors (Pepsico/Balaji) at ₹1,320/q fieldgate to bypass flooded mandis.'
          ]
        }
      };
    }

    if (lower.includes('market') || lower.includes('price') || lower.includes('मंडी') || lower.includes('भाव') || lower.includes('बाज़ार')) {
      if (lang === 'hi') {
        return {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: `आगरा और आसपास की मंडियों के आज के लाइव भाव और मांग का विवरण:`,
          timestamp: 'Just now',
          dataCard: {
            title: 'आगरा मंडी बाज़ार लाइव आंकड़े',
            tag: 'दैनिक मंडी सारांश',
            points: [
              'सरसों (Sarson): ₹५,९५०/क्विंटल (तेजी +₹१७० आज, सरकारी एमएसपी ₹५,६५० से काफी ऊपर)। तेल मिलों में निरंतर मांग।',
              'आलू (Kufri Bahar): ₹१,२५०/क्विंटल (मंदी -₹७० आज, फतेहाबाद से बंपर आवक के दबाव में)।',
              'चना (Desi JG-11): ₹५,६००/क्विंटल (मजबूत, एमएसपी ₹५,४४० से ऊपर)। बेसन व दाल मिलों से अच्छी मांग।',
              'गेहूं (Sharbati): ₹२,५५०/क्विंटल (स्थिर, आटा मिलों की सक्रिय खरीद)।'
            ]
          }
        };
      }

      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: `Here is the live market snapshot across Agra and neighboring APMCs:`,
        timestamp: 'Just now',
        dataCard: {
          title: 'Agra Regional Mandi Intelligence',
          tag: 'Live Mandi Snapshot',
          points: [
            'Mustard (Sarson): ₹5,950/quintal (Trending UP +₹170 today, well above MSP of ₹5,650). Crushers actively procuring.',
            'Potato (Alu): ₹1,250/quintal (Trending DOWN -₹70 due to heavy regional arrivals from Fatehabad).',
            'Chickpea (Chana): ₹5,600/quintal (Steady above MSP ₹5,440). Confectionery and besan demand firm.',
            'Wheat (Sharbati): ₹2,550/quintal (Steady, flour mills building buffer stocks ahead of government procurement).'
          ]
        }
      };
    }

    if (lower.includes('scheme') || lower.includes('subsidy') || lower.includes('योजना') || lower.includes('सब्सिडी') || lower.includes('सरकारी')) {
      if (lang === 'hi') {
        return {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: `आगरा में आपके ५ एकड़ सिंचित खेत के लिए फार्महब द्वारा सुझाई गई शीर्ष सरकारी योजनाएं:`,
          timestamp: 'Just now',
          dataCard: {
            title: 'आपके खेत हेतु उपयुक्त सरकारी सब्सिडी',
            tag: 'सरकारी योजना पोर्टल',
            points: [
              '१. पीएमकेएसवाई (सूक्ष्म सिंचाई): ५ एकड़ खेत पर ड्रिप एवं स्प्रिंकलर लगाने पर ५५% तक सरकारी अनुदान।',
              '२. पीएमएफबीवाई (प्रधानमंत्री फसल बीमा): रबी फसलों के लिए मात्र १.५% प्रीमियम पर भारी वर्षा व ओलावृष्टि से सुरक्षा।',
              '३. स्मैम (कृषि यंत्रीकरण): ट्रैक्टर आलू डिगर और लेजर लैंड लेवलर खरीदने पर ४०-५०% सरकारी छूट।',
              '४. पीएम-किसान सम्मान निधि: सालाना ₹६,००० की प्रत्यक्ष नकद सहायता सीधे आधार लिंक बैंक खाते में।'
            ]
          }
        };
      }

      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: `For your 5-acre irrigated farm in Agra, FarmHub has matched 3 high-impact government programs:`,
        timestamp: 'Just now',
        dataCard: {
          title: 'Matched Agricultural Subsidies (Agra District)',
          tag: 'Government Schemes Portal',
          points: [
            '1. PMKSY (Micro-Irrigation): Up to 55% subsidy on Drip and Sprinklers for your 5 acres.',
            '2. PMFBY (Crop Insurance): Premium is only 1.5% for Rabi crops. Essential for protection against unseasonal rainfall.',
            '3. SMAM (Mechanization): 40-50% subsidy on tractor potato diggers and laser land levelers.',
            '4. PM-KISAN: ₹6,000 annual direct cash transfer to landholding bank account.'
          ]
        }
      };
    }

    // Default intelligent response
    return {
      id: `ai-${Date.now()}`,
      sender: 'assistant',
      text: lang === 'hi'
        ? `मैंने आगरा में आपके ${farm.farmArea} एकड़ खेत के डेटा के आधार पर प्रश्न का विश्लेषण किया है। वर्तमान में **सरसों** और **चना** सबसे सुरक्षित व लाभदायक फसलें हैं, जबकि खेत में खड़ी **आलू की फसल (९२% परिपक्व)** को ८५ मिमी बारिश के खतरे से बचाने हेतु तुरंत कटाई अनिवार्य है।`
        : `I've analyzed your question against FarmHub's live model for your ${farm.farmArea}-acre farm in ${farm.location}. Current parameters indicate **Mustard** and **Chickpea** offer optimal risk-adjusted returns, while the standing **Potato crop (92% mature)** requires immediate harvest due to the 85mm rainfall warning.`,
      timestamp: 'Just now'
    };
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
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

        <button
          onClick={() => setMessages([getInitialMessage(language)])}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-50 text-xs font-bold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t.clearChatBtn}</span>
        </button>
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

              <div className={`max-w-[85%] sm:max-w-[75%] space-y-2`}>
                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-emerald-700 text-white font-medium rounded-tr-none'
                    : 'bg-stone-50 border border-stone-200 text-stone-800 rounded-tl-none font-normal'
                }`}>
                  <p>{msg.text}</p>
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

                <div className={`text-[10px] text-stone-400 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp}
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
