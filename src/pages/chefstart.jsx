import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactPlayer from 'react-player';
 import { ToastContainer, toast } from 'react-toastify';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../styles/style.css';
import RadioGroupRating from '../components/RadioGroupRating';
import ToDoNotes from '../components/ToDoNotes';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';



const slidesData = [
    {
        "imgSrc": "Images/images.jpg",
        "title": "Knife Skills 101",
        "description": "Learn essential knife techniques — how to chop, slice, and dice vegetables safely and efficiently.",
        "categories": ["Beginner"],
        "videoUrl": "https://www.youtube.com/watch?v=YrHpeEwk_-U",
        "tasks": [
            {
                "time": 132,
                "question": "You're prepping dinner and reach for the onion. How do you grip your knife to ensure full control without slipping?",
                "options": ["Grab the blade directly", "Curl your fingers and grip the handle", "Pinch only the tip of the knife"],
                "correctIndex": 1,
            },
            {
                "time": 490,
                "question": "Your tomato keeps squishing under the knife. What’s the best way to fix this mid-prep?",
                "options": ["Use more force", "Sharpen the knife to reduce pressure needed", "Switch to a serrated blade for everything"],
                "correctIndex": 1,
            },
        ],
        "realTask": {
              "description": "Grab an onion or tomato. First, practice the correct grip: pinch the blade and wrap your fingers around the handle. Slice slowly, aiming for consistent thickness. Observe your cuts — are they clean and controlled? Do 10 slices, then assess.",
  "duration": 30,

        },
    },
    {
        "imgSrc": "Images/rice.jpg",
        "title": "Cooking Rice Perfectly",
        "description": "Master the foolproof way to cook fluffy rice.",
        "categories": ["Beginner"],
        "videoUrl": "https://www.youtube.com/watch?v=Xx7sxWI9FNI",
        "tasks": [
            {
                "time": 82,
                "question": "You’re cooking rice for guests and it turns sticky. What should you have done before adding water?",
                "options": ["Add extra salt", "Rinse the rice before cooking", "Soak the rice overnight"],
                "correctIndex": 1,
            },
            {
                "time": 114,
                "question": "Your rice is simmering. Someone asks if they can lift the lid to check. What’s your response?",
                "options": ["Lift the lid to check moisture", "Let it simmer undisturbed", "Loosen the lid for airflow"],
                "correctIndex": 1,
            },
        ],
        "realTask": {
            "description": "Measure ½ cup rice. Rinse thoroughly under cold water until water runs clear. Add 1 cup water, a pinch of salt, and bring to a boil. Cover and simmer on low for 10 minutes. Do *not* lift the lid. At the end, taste: is it fluffy, not sticky? Adjust next time based on texture",
            "duration": 30,
        },
    },
    {
        "imgSrc": "Images/spices.webp",
        "title": "Cooking with Spices",
        "description": "Explore the fundamentals of spices — when and how to use them.",
        "categories": ["Intermediate"],
        "videoUrl": "https://www.youtube.com/watch?v=bsYzWK3cxOM",
        "tasks": [
            {
                "time": 272,
                "question": "You’re baking and someone questions your use of cinnamon in a savory dish. What’s a confident explanation?",
                "options": ["Cinnamon adds depth to sweet and savory dishes", "It’s just for the color", "Because the recipe says so"],
                "correctIndex": 0,
            },
        ],
        "realTask": {
            "description": "Pick 3 spices from your kitchen — one sweet (like cinnamon), one savory (like cumin), and one bold (like chili). Smell and taste a pinch of each. Now, heat a pan with oil and bloom them briefly. What aromas come out? Imagine them in sweet or savory dishes. Jot down ideas.",
            "duration": 30,
        },
    },
    {
        "imgSrc": "Images/Sauces.jpg",
        "title": "Introduction to Sauces",
        "description": "Understand the building blocks of sauces — from thickening to balancing acidity and flavor.",
        "categories": ["Intermediate"],
        "videoUrl": "https://www.youtube.com/watch?v=Upqp21Dm5vg",
        "tasks": [
            {
                "time": 100,
                "question": "You’re melting butter for a creamy sauce. What do you do next to start a smooth roux?",
                "options": ["Add vinegar quickly", "Whisk in flour until combined", "Pour milk immediately"],
                "correctIndex": 1,
            },
            {
                "time": 180,
                "question": "Your roux is clumping as you add the stock. What’s a smart fix?",
                "options": ["Whisk constantly while slowly adding stock", "Turn up the heat to boil faster", "Dump all the liquid in at once"],
                "correctIndex": 0,
            },
            {
                "time": 240,
                "question": "Your sauce tastes too tangy. How can you mellow it out?",
                "options": ["More vinegar to balance the acid", "A touch of sugar or butter for softness", "Chili flakes to distract the taste buds"],
                "correctIndex": 1,
            },
        ],
        "realTask": {
            "description": "Melt 1 tbsp butter in a pan. Whisk in 1 tbsp flour until a smooth paste forms (a roux). Slowly add ½ cup warm milk, whisking constantly. Let it thicken. Season with salt and taste. Try adjusting the flavor with a bit of lemon juice, sugar, or herbs — how does it change?",
            "duration": 30,
        },
    },
    {
        "imgSrc": "Images/Strifry.jpg",
        "title": "How to Stir Fry ANYTHING - A Master Class",
        "description": "Learn the timing, heat control, and sauce-building needed to stir fry proteins and veggies like a pro.",
        "categories": ["Intermediate"],
        "videoUrl": "https://www.youtube.com/watch?v=Swkq2jc5AnA",
        "tasks": [
            {
                "time": 100,
                "question": "Your pan is very hot. What oil won’t burn and is ideal for stir-frying?",
                "options": ["Olive oil", "Butter", "Peanut oil"],
                "correctIndex": 2,
            },
            {
                "time": 180,
                "question": "You're cooking carrots, bell peppers, and tofu. What’s the ideal sequence?",
                "options": ["Throw all in at once", "Start with carrots and bell peppers, tofu last", "Tofu first, then the rest"],
                "correctIndex": 1,
            },
            {
                "time": 240,
                "question": "Your stir-fry sauce looks too thin. What’s a chef’s go-to thickener?",
                "options": ["Add water", "Stir in a cornstarch slurry", "Add extra oil"],
                "correctIndex": 1,
            },
        ],
        "realTask": {
            "description": "Choose any 3 veggies (e.g., bell peppers, carrots, onions) and a protein (tofu or chicken). Heat oil (use peanut oil if possible) in a wok. Add hardest veggies first. Stir constantly. Add soy sauce + a cornstarch-water mix to thicken. Taste, adjust seasoning, and serve hot.",
            "duration": 30,
        },
    },
    {
        "imgSrc": "Images/Platting.jpg",
        "title": "Plating Essentials",
        "description": "Discover plating techniques that enhance the look and feel of your dishes, from color balance to symmetry.",
        "categories": ["Advanced"],
        "videoUrl": "https://www.youtube.com/watch?v=YPCM1hG1h3E",
        "tasks": [
            {
                "time": 100,
                "question": "You’re about to serve a dish. What’s the best way to make it look appealing?",
                "options": ["Stack everything in the center", "Use color contrast and leave empty space", "Use only one ingredient for focus"],
                "correctIndex": 1,
            },
            {
                "time": 180,
                "question": "You’re placing elements on a plate. What principle makes your layout most attractive?",
                "options": ["Speed of plating", "Flavor and height contrast", "Follow symmetrical shapes only"],
                "correctIndex": 1,
            },
            {
                "time": 240,
                "question": "You left part of the plate empty. Why is that intentional?",
                "options": ["To draw focus to the food using negative space", "So you can add sauce later", "To follow modern trends"],
                "correctIndex": 0,
            },
        ],
        "realTask": {
            "description": "Take a simple dish (even leftovers). Use a large white plate. Place main element slightly off-center. Add small color contrast (like herbs or sauce drizzle). Leave empty space. Add one element with height. Take a photo — does it look restaurant-style?",
            "duration": 30,
        },
    },
    {
        "imgSrc": "Images/SousVide.jpg",
        "title": "Sous Vide Basics",
        "description": "Learn the fundamentals of sous vide cooking — precise temperature control for perfectly cooked meats and more.",
        "categories": ["Advanced"],
        "videoUrl": "https://www.youtube.com/watch?v=JTmMz5BT094",
        "tasks": [
            {
                "time": 100,
                "question": "You want perfect doneness in steak. What’s the key benefit of sous vide?",
                "options": ["It’s faster", "It keeps the exact internal temperature", "It adds smoky flavor"],
                "correctIndex": 1,
            },
            {
                "time": 180,
                "question": "You drop the steak in a sous vide bath. What’s the ideal water temp behavior?",
                "options": ["Rise slowly", "Stay constant and precise", "Fluctuate with cooking time"],
                "correctIndex": 1,
            },
            {
                "time": 240,
                "question": "Sous vide is done. How do you give your steak a restaurant finish?",
                "options": ["Serve immediately", "Briefly sear it on a hot pan", "Dip in warm broth"],
                "correctIndex": 1,
            },
        ],
        "realTask": {
            "description": "Seal any protein (e.g., chicken breast) in a zip bag using water displacement method. Submerge in a pot of 60°C water for 30 min (simulate sous vide). Afterward, dry it and sear both sides on a hot pan. Did the doneness feel even? Try with a different cut next time.",
            "duration": 30,
        },
    },
    {
        "imgSrc": "Images/Sushi.jpg",
        "title": "Advanced: Sushi Rolling & Knife Precision",
        "description": "Master sushi-making fundamentals — from slicing raw fish to rolling tight, even sushi rolls.",
        "categories": ["Advanced"],
        "videoUrl": "https://www.youtube.com/watch?v=ZzLPUoetSHw",
        "tasks": [
            {
                "time": 100,
                "question": "You’re slicing fish for sushi. What ensures the cleanest cut?",
                "options": ["Cut fast and short", "Use one smooth stroke with a sharp blade", "Use a serrated knife"],
                "correctIndex": 1,
            },
            {
                "time": 180,
                "question": "Your sushi keeps falling apart. What technique can help create a compact, tight roll?",
                "options": ["Overstuff it", "Apply gentle, even pressure and spacing", "Use a lot of wet ingredients"],
                "correctIndex": 1,
            },
            {
                "time": 240,
                "question": "Why is the bamboo mat essential for rolling sushi?",
                "options": ["It decorates the roll", "It gives an even, firm shape", "It keeps your hands clean"],
                "correctIndex": 1,
            },
        ],
        "realTask": {
            "description": "Lay a bamboo mat with plastic wrap. Spread seasoned rice thinly on a nori sheet. Add thin veggie strips (e.g., cucumber, carrot). Roll tightly, using gentle pressure. Slice with a sharp, wet knife in one motion. Arrange slices and take a picture of your work.",
            "duration": 30,
        },
    },
];

const Chefstart = () => {
  const swiperWrappedRef = useRef(null);
  const playerRef = useRef(null);

  const [modalVideoUrl, setModalVideoUrl] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [completedTasks, setCompletedTasks] = useState({});
  const [showRealTask, setShowRealTask] = useState(false);
  const [taskTimeLeft, setTaskTimeLeft] = useState(0);
  const [taskDoneEnabled, setTaskDoneEnabled] = useState(false);
const [completedVideos, setCompletedVideos] = useState({});
 const [cookingMode, setCookingMode] = useState(false);
const [showChecklist, setShowChecklist] = useState(false);

const [shownoti, setnoti] = useState(true);

  const [showConfidenceRating, setShowConfidenceRating] = useState(false);
  const [confidenceValue, setConfidenceValue] = useState(null);
  const [confidentTasksList, setConfidentTasksList] = useState([]);

  const [confidentTasks, setConfidentTasks] = useState({});
  const [showRewatchPrompt, setShowRewatchPrompt] = useState(false);
  const [journalReflection, setJournalReflection] = useState({
  good: "",
  bad: "",
  remindMe: false,
});
const [showJournal, setShowJournal] = useState(false);
const [journalSaved, setJournalSaved] = useState(false);


  const adjustMargin = () => {
    const screenWidth = window.innerWidth;
    if (swiperWrappedRef.current) {
      swiperWrappedRef.current.style.marginLeft =
        screenWidth <= 520 ? "0px" :
        screenWidth <= 650 ? "-50px" :
        screenWidth <= 800 ? "-100px" : "-150px";
    }
  };

  useEffect(() => {
    document.body.style.backgroundImage = "linear-gradient(90deg,rgba(0, 29, 43, 1) 33%, rgba(2, 2, 18, 1) 50%, rgba(0, 33, 48, 1) 100%)";
    adjustMargin();
      const savedConfidentTasksList = JSON.parse(localStorage.getItem("confidentTasksList")) || [];
  const savedConfidentTasks = JSON.parse(localStorage.getItem("confidentTasks")) || {};
  const savedCompletedVideos = JSON.parse(localStorage.getItem("completedVideos")) || {};

  setConfidentTasksList(savedConfidentTasksList);
  setConfidentTasks(savedConfidentTasks);
  setCompletedVideos(savedCompletedVideos);
    window.addEventListener("resize", adjustMargin);
    return () => {
      document.body.style.backgroundImage = "";
      window.removeEventListener("resize", adjustMargin);
    };
  }, []);

  useEffect(() => {
  localStorage.setItem("confidentTasksList", JSON.stringify(confidentTasksList));
}, [confidentTasksList]);

useEffect(() => {
  localStorage.setItem("confidentTasks", JSON.stringify(confidentTasks));
}, [confidentTasks]);

  const handleProgress = ({ playedSeconds, played }) => {
    if (currentSlideIndex === null) return;
    const slide = slidesData[currentSlideIndex];
    const tasks = slide.tasks || [];
    const completed = completedTasks[currentSlideIndex] || [];

    if (!cookingMode) {
  const nextTask = tasks.find((task, idx) => playedSeconds >= task.time && !completed.includes(idx));

  if (nextTask) {
    playerRef.current?.seekTo(nextTask.time);
    playerRef.current?.getInternalPlayer()?.pauseVideo?.();
    setCurrentTask({ ...nextTask, taskIndex: tasks.indexOf(nextTask) });
    setSelectedAnswer(null);
  }
}

    // Show real task ONLY at end of video and only if all quiz tasks completed
 if (
  cookingMode &&
  played >= 0.99 &&
  !showRealTask &&
  slide.realTask
) {
  
  if(shownoti)
  {
  toast.info("Prep first! Checklist before challenge begins.");
  setnoti(false);
  }
  setShowChecklist(true);
}

  };

  const handleAnswerSubmit = () => {
    if (!currentTask) return;
    const { correctIndex, taskIndex } = currentTask;

   if (selectedAnswer === correctIndex) {
     const audio = new Audio("./Images/correct.mp3");
  audio.play().catch((e) => console.log("Playback error:", e));
    toast.success("Correct! 🎉");

    if (!cookingMode) {
      setCompletedTasks((prev) => {
        const updated = { ...prev };
        if (!updated[currentSlideIndex]) updated[currentSlideIndex] = [];
        updated[currentSlideIndex].push(taskIndex);
        return updated;
      });
    }

    setCurrentTask(null);
    playerRef.current?.getInternalPlayer()?.playVideo?.();
  } else {
     const audio = new Audio("./Images/fail.mp3");
  audio.play().catch((e) => console.log("Playback error:", e));
 toast.error("Hmm, not quite. Re-read the question — think like a chef!");
  }
  
  };
  const saveJournalToLocal = () => {
  const skillKey = slidesData[currentSlideIndex]?.title || `task-${currentSlideIndex}`;
  const existing = JSON.parse(localStorage.getItem("journalEntries")) || {};
  existing[skillKey] = journalReflection;
  localStorage.setItem("journalEntries", JSON.stringify(existing));
  setJournalSaved(true);
};

useEffect(() => {
  if (showRealTask && currentSlideIndex !== null) {
    setTaskTimeLeft(slidesData[currentSlideIndex]?.realTask?.duration || 30);
  }
}, [showRealTask, currentSlideIndex]);
useEffect(() => {
  if (!cookingMode && currentSlideIndex !== null) {
    const slideTasks = slidesData[currentSlideIndex]?.tasks || [];
    const completed = completedTasks[currentSlideIndex] || [];

    if (slideTasks.length > 0 && completed.length === slideTasks.length) {
      setCompletedVideos((prev) => {
        const updated = { ...prev, [currentSlideIndex]: true };
        localStorage.setItem("completedVideos", JSON.stringify(updated));
        return updated;
      });
    }
  }
}, [completedTasks, currentSlideIndex, cookingMode]);
useEffect(() => {
  let timer;
  if (showRealTask && taskTimeLeft > 0) {
    timer = setInterval(() => {
      setTaskTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTaskDoneEnabled(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }
  return () => clearInterval(timer);
}, [showRealTask, taskTimeLeft]);


const resetSlideSession = () => {
  setModalVideoUrl(null);
  setCurrentSlideIndex(null);
  setCurrentTask(null);
  setShowRealTask(false);
  setShowConfidenceRating(false);
  setConfidenceValue(null);
  setShowRewatchPrompt(false);
  setShowPostTaskConvo(false);
};

  return (
    <div>
      <h1 style={{
        fontFamily: "Life Savers",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        margin: "0 auto",
        fontSize: "clamp(24px, 6vw, 60px)",
      }}>
        ChefStart
      </h1>
     
<div style={{
  position: "absolute",
  top: "20px",
  right: "20px",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontFamily: "Poppins",
  fontSize: "16px",
  color: "white"
}}>
    <Tooltip title="Want to practice real cooking skills? Turn this on to skip quizzes and take on a timed hands-on challenge at the end of each video.">
      <IconButton  style={{ color: "white",opacity:"1"}} className='tbtn'>
            <InfoOutlineIcon style={{opacity:"1",color:"white"
            }}/>
      </IconButton>
    </Tooltip>

  <label className="switch">
   <input
  type="checkbox"
  checked={cookingMode}
  onChange={() => setCookingMode(!cookingMode)}
/>

    <span className="slider round"></span>
 
  </label>

  <span>Cooking Mode</span>
</div>


      <main>
        <div className="container">
          <Swiper
            modules={[Pagination]}
            grabCursor
            initialSlide={0}
            centeredSlides
            slidesPerView="auto"
            speed={800}
            slideToClickedSlide
            pagination={{ clickable: true }}
            breakpoints={{
              320: { spaceBetween: 40 },
              650: { spaceBetween: 30 },
              1000: { spaceBetween: 20 },
            }}
            onSwiper={(swiper) => {
              swiperWrappedRef.current = swiper.wrapperEl;
            }}
          >
            {slidesData.map((slide, index) => (
              <SwiperSlide key={index}>
       
                <img src={slide.imgSrc} alt={slide.title} />
                
                <div className="title"><h1>{slide.title}</h1></div>
                <div className="content">
                           {completedVideos[index] && (
  <div className="badge-completed">
    ✅ Completed
  </div>
)}
                   <div className="text-box">
    <p>{slide.description}</p>
  </div>
                  <div className="footer">
                    <div className="category">
                      {slide.categories.map((cat, idx) => (
                        <span key={idx} style={{ "--i": idx + 1 }}>{cat}</span>
                      ))}
                    </div>
                    <button onClick={() => {
                      setModalVideoUrl(slide.videoUrl);
                      setCurrentSlideIndex(index);
                      setCompletedTasks((prev) => ({ ...prev, [index]: [] }));
                      setShowRealTask(false);
                      setShowConfidenceRating(false); // reset confidence UI on new video open
                      setCurrentTask(null);
                      setSelectedAnswer(null);
                      setConfidenceValue(null);
                      setShowRewatchPrompt(false);
                    }}>
                      <span className="label">Watch Video</span>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Modal Video Player */}
        {modalVideoUrl && (
   <div className="video-modal" onClick={resetSlideSession}>
            <div className="video-container" onClick={(e) => e.stopPropagation()}>
              <ReactPlayer
                ref={playerRef}
                url={modalVideoUrl}
                playing
                controls
                width="100%"
                height="100%"
                onProgress={handleProgress}
              />
      <button className="close-btn" onClick={resetSlideSession}>✕</button>

              {/* In-Video Task */}
              {currentTask && (
                <div className="quiz-container" style={{
                  background: "linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)",
                  fontFamily: "Poppins",
                  color: "white",
                  fontSize: "20px"
                }} >
                  <h3>{currentTask.question}</h3>
                  <div className="option-grid">
  {currentTask.options.map((opt, idx) => (
    <div
      key={idx}
      className={`quiz-option ${selectedAnswer === idx ? 'selected' : ''}`}
      onClick={() => setSelectedAnswer(idx)}
    >
      {opt}
    </div>
  ))}
</div>

                  <button
                    onClick={handleAnswerSubmit}
                    disabled={selectedAnswer === null}
                    className="qbtn"
                    style={{ border: "2px solid black", opacity: "1" }}
                  >
                    Submit
                  </button>
                </div>
              )}

              {/* Real Task UI - shown only if real task active AND confidence rating NOT shown */}

              {showChecklist && (
  <div className="real-task-container">
    <h2>👨‍🍳 Chef’s Prep Checklist</h2>
    <ul style={{ textAlign: "left", paddingLeft: "20px" }}>
      <li>✅ Do you have all ingredients ready?</li>
      <li>✅ Is your workspace clean and clear?</li>
      <li>✅ Did you understand the technique shown?</li>
    </ul>
    <button
      className="real-task-button tbtn"
      style={{ marginTop: "10px", opacity: "1", marginLeft:"22px"}}
      onClick={() => {
        setShowChecklist(false);
        setShowRealTask(true);
        setTaskTimeLeft(slide.realTask.duration || 30);
        setTaskDoneEnabled(false);
        
      }}
    >
      I'm Ready!
    </button>
  </div>
)}
            {showRealTask && !showConfidenceRating && (
  <div className="real-task-container">
    <h2>🍳 Chef’s Challenge</h2>
    <p className="real-task-desc">
      {slidesData[currentSlideIndex]?.realTask?.description}
    </p>
    <div className="real-task-timer">⏱ Time Left: {taskTimeLeft}s</div>
    <button style={{opacity:"1",marginLeft:"22px"}}
      disabled={!taskDoneEnabled}
      onClick={() => {
      const audio = new Audio("./Images/success.mp3");
  audio.play().catch((e) => console.log("Playback error:", e));

        toast.success("Great! Task completed ✅ You are doing great chef!");
        setShowRealTask(false);
        setShowConfidenceRating(true);
      }}
      className="real-task-button tbtn"
    >
      Done
    </button>
  </div>
)}

              {/* Confidence Rating UI - shown after Done clicked */}
              {showConfidenceRating && (
                <div className="quiz-container" style={{
                  background: "linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)",
                  fontFamily: "Poppins",
                  color: "white",
                  fontSize: "20px"
                }}>
                  <h3>How confident are you about this skill?</h3>
                  <RadioGroupRating
                    onConfidenceSubmit={(rating) => {
                      setConfidenceValue(rating);
                    if (rating >= 4) {
  const skillTitle = slidesData[currentSlideIndex]?.title;
  setConfidentTasks((prev) => {
    const updated = { ...prev };
    if (!updated[currentSlideIndex]) updated[currentSlideIndex] = [];
    updated[currentSlideIndex].push(true);
    return updated;
  });
  setCompletedVideos((prev) => {
  const updated = { ...prev, [currentSlideIndex]: true };
  localStorage.setItem("completedVideos", JSON.stringify(updated));
  return updated;
});
  setConfidentTasksList((prev) =>
    prev.includes(skillTitle) ? prev : [...prev, skillTitle]
  );
  setShowRewatchPrompt(false);

                      } else {
                        setShowRewatchPrompt(true);
                      }
                      setShowJournal(true)
                    }  }
                  />

                  {showRewatchPrompt && confidenceValue < 4 && (
                    <div style={{ marginTop: "10px", color: "yellow" }}>
                      😕 Not feeling confident? Consider{' '}
                      <span
                        style={{ textDecoration: "underline", cursor: "pointer" }}
                        onClick={() => playerRef.current?.seekTo(0)}
                      >
                        rewatching the video
                      </span>.
                    </div>
                  )}

           {confidenceValue >= 4 && (
  <>
    <div style={{ marginTop: "10px", color: "#00ff88" }}>
      
      ✅ Confidence noted! This skill will be tracked in your progress.
    </div>

    {showJournal && (
  <div className="journal-box" style={{
    marginTop: "20px",
    padding: "16px",
    backgroundColor: "#202030",
    borderRadius: "12px",
    color: "#fff",
   /* From https://css.glass */
background:"rgba(255, 255, 255, 0.2)",
borderRadius: "16px",
boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
backdropFilter:  "blur(5px)",
WebkitBackdropFilter:"blur(5px)",
border: "1px solid rgba(255, 255, 255, 0.3)"
  }}>
    <h4>📝 Self-Coaching Journal</h4>
    <label>✅ What went well?</label>
    <textarea
      value={journalReflection.good}
      onChange={(e) => setJournalReflection({ ...journalReflection, good: e.target.value })}
      rows={2}
      style={{ width: "100%", marginBottom: "8px" ,backgroundColor:"white",color:"black" }}
    />
    <label>🤔 What was tricky?</label>
    <textarea
      value={journalReflection.bad}
      onChange={(e) => setJournalReflection({ ...journalReflection, bad: e.target.value })}
      rows={2}
      style={{ width: "100%", marginBottom: "8px",backgroundColor:"white",color:"black" }}
    />
    <label>
      <input
        type="checkbox"
        checked={journalReflection.remindMe}
        onChange={() => setJournalReflection((prev) => ({
          ...prev,
          remindMe: !prev.remindMe,
        }))}
      />{" "}Remind me to retry in 3 days
    </label>
    <br />
    <button
      className="qbtn"
      style={{ marginTop: "12px",opacity:"1",marginLeft:"20px"}}
      onClick={saveJournalToLocal}
    >
      💾 Save Reflection
    </button>
    {journalSaved && (
      <div style={{ color: "#00FF88", marginTop: "8px" }}>✅ Saved!</div>
    )}
  </div>
)}

  </>
)}


                  <button
                    onClick={() => {
                      toast.success("Thanks for your feedback! Closing task.");
                      setShowConfidenceRating(false);
                      setModalVideoUrl(null);
                      setCurrentSlideIndex(null);
                      setConfidenceValue(null);
                      setShowRewatchPrompt(false);
                    }}
                    className="qbtn"
                    style={{
                      marginTop: "10px",
                      padding: "10px",
                      border: "2px solid black",
                    }}
                  >
                    Close
                  </button>
                </div>
              )}

            </div>
          </div>
        )}
      </main>
<ToDoNotes confidentTasksList={confidentTasksList} />

      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
    </div>
  );
};

export default Chefstart;
