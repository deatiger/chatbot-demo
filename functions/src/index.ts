import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
admin.initializeApp();
const db = admin.firestore();

interface Data {
    [id: string]: {
        answers: { content: string, nextId: string }[]
        question: string
    }
}
interface Dataset extends Data{}

const defaultDataset: Dataset = {
    "init": {
        answers: [
            {content: "仕事を依頼したい", nextId: "job_offer"},
            {content: "エンジニアのキャリアについて相談したい", nextId: "consultant"},
            {content: "学習コミュニティについて知りたい", nextId: "community"},
            {content: "お付き合いしたい", nextId: "dating"},
        ],
        question: "こんにちは！🐯トラハックへのご用件はなんでしょうか？",
    },
    "job_offer": {
        answers: [
            {content: "Webサイトを制作してほしい", nextId: "website"},
            {content: "Webアプリを開発してほしい", nextId: "webapp"},
            {content: "自動化ツールを作ってほしい", nextId: "automation_tool"},
            {content: "その他", nextId: "other_jobs"}
        ],
        question: "どのようなお仕事でしょうか？",
    },
    "website": {
        answers: [
            {content: "問い合わせる", nextId: "contact"},
            {content: "最初の質問に戻る", nextId: "init"}
        ],
        question: "Webサイト細作についてですね。コチラからお問い合わせできます。",
    },
    "webapp": {
        answers: [
            {content: "問い合わせる", nextId: "contact"},
            {content: "最初の質問に戻る", nextId: "init"}
        ],
        question: "Webアプリ開発についてですね。コチラからお問い合わせできます。",
    },
    "automation_tool": {
        answers: [
            {content: "問い合わせる", nextId: "contact"},
            {content: "最初の質問に戻る", nextId: "init"}
        ],
        question: "自動化ツール開発についてですね。コチラからお問い合わせできます。",
    },
    "other_jobs": {
        answers: [
            {content: "問い合わせる", nextId: "contact"},
            {content: "最初の質問に戻る", nextId: "init"}
        ],
        question: "その他についてですね。コチラからお問い合わせできます。",
    },
    "consultant": {
        answers: [
            {content: "YouTubeで動画を見る", nextId: "https://www.youtube.com/channel/UC-bOAxx-YOsviSmqh8COR0w"},
            {content: "学習コミュニティについて知りたい", nextId: "community"},
            {content: "最初の質問に戻る", nextId: "init"}
        ],
        question: "トラハックは普段からYouTubeでキャリアについて発信しています。また、僕が運営するエンジニア向け学習コミュニティ内でも相談に乗っていますよ。",
    },
    "community": {
        answers: [
            {content: "どんな活動をしているの？", nextId: "community_activity"},
            {content: "コミュニティに参加したい", nextId: "https://torahack.web.app/community/"},
            {content: "最初の質問に戻る", nextId: "init"}
        ],
        question: "2020年3月から学習コミュニティを始めました！🎉Webエンジニアへの転職を目指す人向けに、プログラミングを教えたりキャリアの相談に乗っています。",
    },
    "community_activity": {
        answers: [
            {content: "さらに詳細を知りたい", nextId: "https://youtu.be/tIzE7hUDbBM"},
            {content: "コミュニティに参加したい", nextId: "https://torahack.web.app/community/"},
            {content: "最初の質問に戻る", nextId: "init"}
        ],
        question: "フロントエンド向けの教材の提供、キャリアや勉強法に関するメルマガの配信、週1のオンライン作業会などを開催しています！\n詳細はYouTube動画で紹介しています。",
    },
    "dating": {
        answers: [
            {content: "DMする", nextId: "https://twitter.com/torahack_"},
            {content: "最初の質問に戻る", nextId: "init"}
        ],
        question: "まずは一緒にランチでもいかがですか？DMしてください😘",
    }
};

/**
 * Execute the following command in your Terminal app
 * curl -X POST https://YOUR_REGION-YOUR_PROJECT_NAME.cloudfunctions.net/addDataset -H "Content-Type:application/json"
*/

export const addDataset = functions.https.onRequest(async (req: any) => {
    if (req.method === "POST") {
        console.log(defaultDataset)
        for (const key of Object.keys(defaultDataset)) {
            const data = defaultDataset[key];
            await db.collection('questions').doc(key).set(data)
        }
        console.log('Added dataset!')
        return true
    } else {
        console.error('The method of this request is not POST', req);
        return false
    }
});

