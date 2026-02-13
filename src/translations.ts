export const translations = {
  id: {
    appTitle: "Patient Health Questionnaire (PHQ-9)",
    appSubtitle: "Penilaian Kesehatan Mental",
    introText: "Dalam dua minggu terakhir, seberapa sering Anda mengalami hal-hal berikut?",
    submitButton: "Lihat Hasil",
    resultsTitle: "Hasil Evaluasi",
    totalScore: "Total Skor:",
    depressionLevel: "Tingkat Depresi:",
    recommendation: "Rekomendasi:",
    attention: "Perhatian:",
    suicidalWarning: "Berdasarkan jawaban Anda pada pertanyaan ke-9, sangat disarankan untuk segera mencari bantuan profesional kesehatan mental. Ini adalah langkah penting untuk keselamatan dan kesejahteraan Anda.",
    exportPdfButton: "Export ke PDF",
    footer: "by veldyva",
    questions: [
      "Sedikit tertarik atau tidak memiliki kesenangan dalam melakukan sesuatu",
      "Merasa sedih, murung, atau putus asa",
      "Kesulitan tidur (sulit tidur, sering terbangun, atau tidur berlebihan)",
      "Merasa lelah atau kurang energi",
      "Kurang nafsu makan atau makan berlebihan",
      "Merasa buruk tentang diri sendiri atau merasa bahwa Anda gagal",
      "Kesulitan berkonsentrasi, misalnya saat membaca atau menonton TV",
      "Bergerak atau berbicara lebih lambat atau merasa sangat gelisah hingga sulit diam",
      "Memiliki pikiran untuk menyakiti diri sendiri atau berpikir lebih baik mati"
    ],
    options: [
      { label: "Tidak sama sekali", value: 0 },
      { label: "Beberapa hari", value: 1 },
      { label: "Lebih dari setengah waktu", value: 2 },
      { label: "Hampir setiap hari", value: 3 }
    ],
    interpretations: {
      minimal: {
        level: "tidak ada atau minimal",
        recommendation: "Tidak memerlukan perawatan lebih lanjut"
      },
      mild: {
        level: "depresi ringan",
        recommendation: "Pantau kondisi, jika berlanjut atau memburuk, konsultasikan ke tenaga medis"
      },
      moderate: {
        level: "depresi sedang",
        recommendation: "Evaluasi lebih lanjut, mungkin membutuhkan terapi atau konsultasi profesional"
      },
      moderateSevere: {
        level: "depresi sedang hingga berat",
        recommendation: "Konsultasi lebih lanjut dengan profesional kesehatan mental sangat disarankan"
      },
      severe: {
        level: "depresi berat",
        recommendation: "Perlu intervensi segera, bisa termasuk terapi dan/atau pengobatan"
      }
    }
  },
  en: {
    appTitle: "Patient Health Questionnaire (PHQ-9)",
    appSubtitle: "Mental Health Assessment",
    introText: "Over the last two weeks, how often have you experienced the following?",
    submitButton: "View Results",
    resultsTitle: "Assessment Results",
    totalScore: "Total Score:",
    depressionLevel: "Depression Level:",
    recommendation: "Recommendation:",
    attention: "Attention:",
    suicidalWarning: "Based on your answer to question 9, it is strongly recommended to seek professional mental health support immediately. This is an important step for your safety and wellbeing.",
    exportPdfButton: "Export to PDF",
    footer: "by veldyva",
    questions: [
      "Little interest or pleasure in doing things",
      "Feeling down, depressed, or hopeless",
      "Trouble falling or staying asleep, or sleeping too much",
      "Feeling tired or having little energy",
      "Poor appetite or overeating",
      "Feeling bad about yourself, or that you are a failure or have let yourself or your family down",
      "Trouble concentrating on things, such as reading the newspaper or watching television",
      "Moving or speaking so slowly that other people could have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
      "Thoughts that you would be better off dead or of hurting yourself in some way"
    ],
    options: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 }
    ],
    interpretations: {
      minimal: {
        level: "no or minimal depression",
        recommendation: "No further treatment needed"
      },
      mild: {
        level: "mild depression",
        recommendation: "Monitor your condition. If it continues or worsens, consult a medical professional"
      },
      moderate: {
        level: "moderate depression",
        recommendation: "Further evaluation recommended. May benefit from therapy or professional consultation"
      },
      moderateSevere: {
        level: "moderately severe depression",
        recommendation: "Consulting with mental health professionals is highly recommended"
      },
      severe: {
        level: "severe depression",
        recommendation: "Immediate intervention needed, which may include therapy and/or medication"
      }
    }
  }
};
