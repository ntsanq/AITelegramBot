const {Configuration, OpenAIApi} = require("openai");

class ChatGPTService {
    async generateCompletion(prompt) {
        // Load key từ file environment
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_KEY,
        });
        const openai = new OpenAIApi(configuration);
        // Gửi request về OpenAI Platform để tạo text completion
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            temperature: 0.7,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        // Đoạn regex ở cuối dùng để loại bỏ dấu cách và xuống dòng dư thừa
        return completion.data.choices[0].text.replace(/^\s+|\s+$/g, "");
    }
}

module.exports = new ChatGPTService();
