import React, { useState } from 'react';
import { Heart, AlertTriangle } from 'lucide-react';

const questions = [
  "Sedikit tertarik atau tidak memiliki kesenangan dalam melakukan sesuatu",
  "Merasa sedih, murung, atau putus asa",
  "Kesulitan tidur (sulit tidur, sering terbangun, atau tidur berlebihan)",
  "Merasa lelah atau kurang energi",
  "Kurang nafsu makan atau makan berlebihan",
  "Merasa buruk tentang diri sendiri atau merasa bahwa Anda gagal",
  "Kesulitan berkonsentrasi, misalnya saat membaca atau menonton TV",
  "Bergerak atau berbicara lebih lambat atau merasa sangat gelisah hingga sulit diam",
  "Memiliki pikiran untuk menyakiti diri sendiri atau berpikir lebih baik mati"
];

const options = [
  { label: "Tidak sama sekali", value: 0, color: "emerald" },
  { label: "Beberapa hari", value: 1, color: "sky" },
  { label: "Lebih dari setengah waktu", value: 2, color: "amber" },
  { label: "Hampir setiap hari", value: 3, color: "rose" }
];

function getInterpretation(score: number) {
  if (score <= 4) return {
    level: "tidak ada atau minimal",
    recommendation: "Tidak memerlukan perawatan lebih lanjut",
    color: "text-emerald-600"
  };
  if (score <= 9) return {
    level: "depresi ringan",
    recommendation: "Pantau kondisi, jika berlanjut atau memburuk, konsultasikan ke tenaga medis",
    color: "text-sky-600"
  };
  if (score <= 14) return {
    level: "depresi sedang",
    recommendation: "Evaluasi lebih lanjut, mungkin membutuhkan terapi atau konsultasi profesional",
    color: "text-amber-600"
  };
  if (score <= 19) return {
    level: "depresi sedang hingga berat",
    recommendation: "Konsultasi lebih lanjut dengan profesional kesehatan mental sangat disarankan",
    color: "text-orange-600"
  };
  return {
    level: "depresi berat",
    recommendation: "Perlu intervensi segera, bisa termasuk terapi dan/atau pengobatan",
    color: "text-rose-600"
  };
}

function App() {
  const [answers, setAnswers] = useState<number[]>(new Array(9).fill(-1));
  const [showResult, setShowResult] = useState(false);

  const totalScore = answers.reduce((acc, curr) => acc + (curr === -1 ? 0 : curr), 0);
  const interpretation = getInterpretation(totalScore);
  const allQuestionsAnswered = answers.every(answer => answer !== -1);
  const hasSuicidalThoughts = answers[8] > 0;

  const handleAnswer = (questionIndex: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };

  const getOptionStyle = (optionValue: number, selectedValue: number) => {
    const option = options[optionValue];
    const isSelected = selectedValue === optionValue;
    
    const baseClasses = "p-3 rounded-lg text-sm transition-all transform hover:scale-105";
    const colorClasses = {
      emerald: isSelected ? "bg-emerald-500 text-white" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
      sky: isSelected ? "bg-sky-500 text-white" : "bg-sky-50 text-sky-700 hover:bg-sky-100",
      amber: isSelected ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-700 hover:bg-amber-100",
      rose: isSelected ? "bg-rose-500 text-white" : "bg-rose-50 text-rose-700 hover:bg-rose-100"
    };

    return `${baseClasses} ${colorClasses[option.color]}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-sky-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-10 h-10 text-teal-600 animate-pulse" />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600">
              Patient Health Questionnaire (PHQ-9)
            </h1>
          </div>
          
          <p className="text-gray-700 mb-8 text-lg">
            Dalam dua minggu terakhir, seberapa sering Anda mengalami hal-hal berikut?
          </p>

          <div className="space-y-6">
            {questions.map((question, index) => (
              <div key={index} className="p-6 bg-white/40 backdrop-blur-sm rounded-xl hover:bg-white/50 transition-colors border border-white/20">
                <p className="text-gray-800 mb-4 text-lg">
                  {index + 1}. {question}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(index, option.value)}
                      className={getOptionStyle(option.value, answers[index])}
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
            Lihat Hasil
          </button>

          {showResult && allQuestionsAnswered && (
            <div className="mt-8 p-6 bg-white/40 backdrop-blur-sm rounded-xl border border-white/20">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600 mb-4">
                Hasil Evaluasi
              </h2>
              <p className="text-xl mb-2">
                Total Skor: <span className="font-bold">{totalScore}</span>
              </p>
              <p className="mb-2">
                Tingkat Depresi:{' '}
                <span className={`font-bold ${interpretation.color}`}>
                  {interpretation.level}
                </span>
              </p>
              <p className="text-gray-700">
                Rekomendasi: {interpretation.recommendation}
              </p>

              {hasSuicidalThoughts && (
                <div className="mt-4 p-4 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-1" />
                  <p className="text-rose-700">
                    <strong>Perhatian:</strong> Berdasarkan jawaban Anda pada pertanyaan ke-9,
                    sangat disarankan untuk segera mencari bantuan profesional kesehatan mental.
                    Ini adalah langkah penting untuk keselamatan dan kesejahteraan Anda.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <footer className="text-center text-teal-600 text-sm font-medium">
          by veldyva
        </footer>
      </div>
    </div>
  );
}

export default App;