export const sampleSurvey = 'What is the best pizza topping?\n[] Pepperoni\n[] Cheese\n[] Pineapple'

export async function parseSurvey(surveyText) {
    let formattedQuestions = []
  
    let rawQuestions = '';
    
    if(surveyText) {
    
        rawQuestions = surveyText.split('\n\n');
      
        rawQuestions.map((q, i) => {
          let qPrompt = q.match(/^(.*\?$)/gim, '$1')
          
          if(qPrompt) {
            formattedQuestions.push({ prompt: qPrompt[0] })
          } else {
            formattedQuestions.push({})
          }
          
          let mcAnswers = q.match(/^.*\[\*?\].*$/gim)
          
          if(mcAnswers != null) {
            let question = q.split('\n');
            question[0] = question[0].replace(' ','_');

            mcAnswers = mcAnswers.map((a) => a.replace(/^\[\] (.*$)/gim, '$1'))

            formattedQuestions[i]['mcAnswers'] = mcAnswers
          }
          
          let sAnswers = q.match(/^.*\_\_\_*$/gim)
          if(sAnswers != null) {
            sAnswers = sAnswers.map((a) => a.replace(/\_\_\_/gim, ''))
            formattedQuestions[i]['sAnswers'] = sAnswers
          }
      
        })
      }
 

 
    return formattedQuestions
  }
  
