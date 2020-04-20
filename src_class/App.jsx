import React from 'react';
import './assets/styles/style.css'
import {db} from './firebase/index'
import {AnswersList, Chats, Loading} from './components/index'
import {FormDialog} from "./components/Forms/index";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: [],          // 回答コンポーネントに表示するデータ
            chats: [],            // チャットコンポーネントに表示するデータ
            currentId: "init",    // 現在の質問ID
            dataset: {},          // 質問と回答のデータセット
            open: false           // 問い合わせフォーム用モーダルの開閉を管理
        };

        this.handleClose = this.handleClose.bind(this)
        this.selectAnswer = this.selectAnswer.bind(this)
    }

    // 次の質問をチャットエリアに表示する関数
    displayNextQuestion = (nextQuestionId) => {
        // 現在のチャット一覧を取得
        const chats = this.state.chats;

        // 次の質問をchatsに追加
        chats.push({
            text: this.state.dataset[nextQuestionId].question,
            type: 'question'
        });

        this.setState({
            answers: this.state.dataset[nextQuestionId].answers,    // 次の回答一覧
            chats: chats,                                           // 選択された回答と次の質問をチャットに追加
            currentId: nextQuestionId,                              // 現在の質問ID
        })
    }

    // 問い合わせフォーム用モーダルを開く関数
    handleOpen = () => {
        this.setState({open: true})
    };
    // 問い合わせフォーム用モーダルを閉じる関数
    handleClose = () => {
        this.setState({open: false})
    };

    initDataset = (dataset) => {
        this.setState({dataset: dataset});
    }

    // 回答が選択された時に呼ばれる関数
    selectAnswer = (selectedAnswer, nextQuestionId) => {
        switch (true) {
            // コンポーネントの初期化時
            case (nextQuestionId === 'init'):
                setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);
                break;

            // お問い合わせが選択された場合
            case (nextQuestionId === 'contact'):
                this.handleOpen();
                break;

            // リンクが選択された時
            case /^https:*/.test(nextQuestionId):
                const a = document.createElement('a');
                a.href = nextQuestionId;
                a.target = '_blank';
                a.click();
                break;

            // 選択された回答をchatsに追加
            default:
                // 現在のチャット一覧を取得
                const chats = this.state.chats;

                chats.push({
                    text: selectedAnswer,
                    type: 'answer'
                });
                this.setState({
                    chats: chats,
                });
                setTimeout(() => this.displayNextQuestion(nextQuestionId), 750)
                break;
        }
    };

    // 最初の質問をチャットエリアに表示する
    componentDidMount() {
        (async() => {
            const dataset = this.state.dataset;

            // Fetch questions dataset from Firestore
            await db.collection('questions').get().then(snapshots => {
                snapshots.forEach(doc => {
                    dataset[doc.id] = doc.data()
                })
            });

            this.initDataset(dataset)
            const initAnswer = "";
            this.selectAnswer(initAnswer, this.state.currentId)
        })();
    }

    // 最新のチャットが見えるように、スクロール位置の頂点をスクロール領域の最下部に設定する
    componentDidUpdate(prevProps, prevState, snapshot) {
        const scrollArea = document.getElementById('scroll-area');
        if (scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight;
        }
    }

    render() {
        return (
            <section className="c-section">
                <div className="c-box">
                    {(Object.keys(this.state.dataset).length === 0) ? (
                        <Loading />
                    ) : (
                        <>
                            <Chats chats={this.state.chats} />
                            <AnswersList answers={this.state.answers} select={this.selectAnswer}/>
                        </>
                    )}
                    <FormDialog open={this.state.open} handleOpen={this.handleOpen} handleClose={this.handleClose}/>
                </div>
            </section>
        )
    }
}

export default App;