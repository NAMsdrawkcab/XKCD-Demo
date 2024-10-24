import React, { Component } from "react";
import axios from "axios";
import ComicView from "../components/ComicView";
import { useStore } from "../createStore";

//class component
export class XkcdPastComicContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pastComic: {},
            pastComicStatus: null,
            userComicNum: null
        }
    }

    componentDidMount() {
        this.pastComicApiCall(null)
    }

    render() {
        // const storeInfo = useStore.getState();
        // console.log(storeInfo)
        const { pastComicStatus, pastComic, userComicNum } = this.state

        return pastComicStatus === "SUCCESS" ?
            <>
                <div>
                    <button type="button" className="btn btn-primary" onClick={() => this.pastComicApiCall(null)}>
                        Get Random Comic
                    </button>
                </div>
                <div>
                    <input 
                        placeholder="Enter desired comic number" 
                        type="text" 
                        value={userComicNum} 
                        onChange={(event) => this.setState({userComicNum: event.target.value})} 
                    />
                    <button disabled={!userComicNum} type="button" className="btn btn-info" onClick={() => this.pastComicApiCall(userComicNum)}>
                        Fetch Comic
                    </button>
                </div>
                <ComicView
                    xkcdComicInfo={pastComic}
                />
            </>
            : pastComicStatus === "FAILURE" ?
                this.onFailure()
                : <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
    }

    onFailure = () => {
        return (
            <div>
                Oops something went wrong, please try again later...
            </div>
        )
    }

    pastComicApiCall = (comicNum) => {
        const stateControl = (data, status) => {
            this.setState({ pastComic: data, pastComicStatus: status })
        }
        axios.get(`/past/${!comicNum ? Math.floor(Math.random() * 2900) : comicNum}`)
            .then(function (response) {
                stateControl(response.data, "SUCCESS");
            })
            .catch(function (error) {
                stateControl({}, "FAILURE")
                console.log(error)
            })
    }

}

export default XkcdPastComicContainer