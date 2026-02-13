import React, { useState } from 'react';
import { Heart, AlertTriangle, Download } from 'lucide-react';
import { translations } from './translations';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const colorMap = {
  emerald: "emerald",
  sky: "sky",
  amber: "amber",
  rose: "rose"
};

function getInterpretation(score: number, lang: 'id' | 'en') {
  const interp = translations[lang].interpretations;
  if (score <= 4) return {
    level: interp.minimal.level,
    recommendation: interp.minimal.recommendation,
    color: "text-emerald-600"
  };
  if (score <= 9) return {
    level: interp.mild.level,
    recommendation: interp.mild.recommendation,
    color: "text-sky-600"
  };
  if (score <= 14) return {
    level: interp.moderate.level,
    recommendation: interp.moderate.recommendation,
    color: "text-amber-600"
  };
  if (score <= 19) return {
    level: interp.moderateSevere.level,
    recommendation: interp.moderateSevere.recommendation,
    color: "text-orange-600"
  };
  return {
    level: interp.severe.level,
    recommendation: interp.severe.recommendation,
    color: "text-rose-600"
  };
}

function App() {
  const [language, setLanguage] = useState<'id' | 'en'>('id');
  const t = translations[language];
  const [answers, setAnswers] = useState<number[]>(new Array(9).fill(-1));
  const [showResult, setShowResult] = useState(false);

  const totalScore = answers.reduce((acc, curr) => acc + (curr === -1 ? 0 : curr), 0);
  const interpretation = getInterpretation(totalScore, language);
  const allQuestionsAnswered = answers.every(answer => answer !== -1);
  const hasSuicidalThoughts = answers[8] > 0;

  const handleAnswer = (questionIndex: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleExportPdf = () => {
    const element = document.getElementById('phq9-results');
    if (element) {
      // Store original styles
      const originalBg = element.style.backgroundColor;
      const originalBackdrop = element.style.backdropFilter;
      const originalBgClass = element.className;

      // Hide the export button
      const exportButton = element.querySelector('button[class*="Download"]');
      const originalButtonDisplay = exportButton?.style.display;

      if (exportButton) exportButton.style.display = 'none';

      // Set background for PDF export
      element.style.backgroundColor = '#ffffff';
      element.style.backdropFilter = 'none';
      element.className = element.className.replace(/bg-white\/\d+|backdrop-blur-\w+/g, 'bg-white');

      // Change all text to black except the depression level
      const allElements = element.querySelectorAll('*');
      const originalColors: { [key: string]: string } = {};

      allElements.forEach((el, index) => {
        originalColors[`el-${index}`] = el.style.color;
        if (el instanceof HTMLElement && !el.textContent.includes(interpretation.level)) {
          el.style.color = '#000000';
        }
      });

      html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save('PHQ9_Results.pdf');

        // Restore original styles
        element.style.backgroundColor = originalBg;
        element.style.backdropFilter = originalBackdrop;
        element.className = originalBgClass;
        if (exportButton) exportButton.style.display = originalButtonDisplay || '';

        allElements.forEach((el, index) => {
          if (el instanceof HTMLElement && originalColors[`el-${index}`] !== undefined) {
            el.style.color = originalColors[`el-${index}`];
          }
        });
      }).catch(error => {
        console.error('Error generating PDF:', error);
        element.style.backgroundColor = originalBg;
        element.style.backdropFilter = originalBackdrop;
        element.className = originalBgClass;
        if (exportButton) exportButton.style.display = originalButtonDisplay || '';
      });
    }
  };

  const getOptionStyle = (optionValue: number, selectedValue: number) => {
    const isSelected = selectedValue === optionValue;

    const baseClasses = "p-3 rounded-lg text-sm transition-all transform hover:scale-105";
    const colors = {
      0: isSelected ? "bg-emerald-500 text-white" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
      1: isSelected ? "bg-sky-500 text-white" : "bg-sky-50 text-sky-700 hover:bg-sky-100",
      2: isSelected ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-700 hover:bg-amber-100",
      3: isSelected ? "bg-rose-500 text-white" : "bg-rose-50 text-rose-700 hover:bg-rose-100"
    };

    return `${baseClasses} ${colors[optionValue]}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-sky-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
          <div className="flex items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <Heart className="w-10 h-10 text-teal-600 animate-pulse" />
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600">
                  {t.appTitle}
                </h1>
                <p className="text-gray-600 text-sm">{t.appSubtitle}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('id')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  language === 'id'
                    ? 'bg-teal-600 text-white'
                    : 'bg-white/50 text-gray-700 hover:bg-white/70'
                }`}
              >
                ID
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  language === 'en'
                    ? 'bg-teal-600 text-white'
                    : 'bg-white/50 text-gray-700 hover:bg-white/70'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          <p className="text-gray-700 mb-8 text-lg">{t.introText}</p>

          <div className="space-y-6">
            {t.questions.map((question, index) => (
              <div key={index} className="p-6 bg-white/40 backdrop-blur-sm rounded-xl hover:bg-white/50 transition-colors border border-white/20">
                <p className="text-gray-800 mb-4 text-lg">
                  {index + 1}. {question}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {t.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(index, option.value)}
                      className={getOptionStyle(idx, answers[index])}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowResult(true)}
            disabled={!allQuestionsAnswered}
            className={`mt-8 w-full py-4 rounded-xl text-white font-semibold transition-all transform hover:scale-102 ${
              allQuestionsAnswered
                ? 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {t.submitButton}
          </button>

          {showResult && allQuestionsAnswered && (
            <div id="phq9-results" className="mt-8 p-6 bg-white/40 backdrop-blur-sm rounded-xl border border-white/20">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600 mb-4">
                {t.resultsTitle}
              </h2>
              <p className="text-xl mb-2 text-gray-800">
                {t.totalScore} <span className="font-bold">{totalScore}</span>
              </p>
              <p className="mb-4 text-gray-800">
                {t.depressionLevel}{' '}
                <span className={`font-bold ${interpretation.color}`}>
                  {interpretation.level}
                </span>
              </p>
              <p className="text-gray-700 mb-6">
                {t.recommendation} {interpretation.recommendation}
              </p>

              {hasSuicidalThoughts && (
                <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-1" />
                  <p className="text-rose-700">
                    <strong>{t.attention}</strong> {t.suicidalWarning}
                  </p>
                </div>
              )}

              <button
                onClick={handleExportPdf}
                className="w-full py-3 px-6 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-medium hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center gap-2 Download"
              >
                <Download className="w-5 h-5" />
                {t.exportPdfButton}
              </button>
            </div>
          )}
        </div>

        <footer className="text-center text-teal-600 text-sm font-medium">
          {t.footer}
        </footer>
      </div>
    </div>
  );
}

export default App;