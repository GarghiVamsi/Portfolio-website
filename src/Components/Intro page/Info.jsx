import "./info.css"
import Button from '@mui/material/Button';

const Info = () => {
    return (
        <div className="info">
            <div className="info-Left"> 
            <div className="info-left-padding">
                <h2 className="info-welcome"> Hello Welcome to my Webpage!</h2>
                <h1 className="info-name"> My name is Vamsi Garghi</h1>
                <div className="info-title">
                    <div className="info-title-wrapper">
                        <div className="info-title-item"> Bachelor's in Computer Science</div>
                        <div className="info-title-item"> Data Analyst @ cognizant techonologies</div>
                        <div className="info-title-item"> Avid basketball player</div>
                        <div className="info-title-item"> Love life</div>
                            <div className="info-title-button">
                            <Button variant="outlined">Click on me!</Button>
                            </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="info-Right"> Right</div>
        </div> 
    )
}

export default Info
