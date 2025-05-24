// import React from "react"
import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import sampleImage from "../../assets/images/SampleGraph.png"
import '../../App.css'

import Plot from 'react-plotly.js';


function InputComponent() {

    const ShowStates = {
        ADD_ACCOUNTS: 'addAccounts',
        SUMMARIZE_ACCOUNTS: 'summarizeAccounts',
        RESULTS: 'showResult',
    };

    const [showState, setShowState] = useState(ShowStates.ADD_ACCOUNTS);

    const [userFormInfo, setUserFormInfo] = useState({ username: '', age: '' });
    const [userInfo, setUserInfo] = useState(null);

    const [accounts, setAccounts] = useState([]);

    // const growth_rates = [-0.01, 0.01, 0.03, 0.05, 0.07, 0.09];
    const after_years = Array.from({ length: 70 - userFormInfo.age }, (_, i) => i);

    const handleAddAccount = () => {
        setShowState(ShowStates.ADD_ACCOUNTS)
        setAccounts([...accounts, {
            name: '',
            initBalance: null,
            contrFreq: "",
            n: null,
            contrAmount: null,
            predictions: [[]]
        }]);
    };


    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newAccounts = [...accounts];
        if (name == "initBalance" || name == "contrAmount") {
            newAccounts[index][name] = Number(value);
            // TODO make this always have two decimal places 
        }
        else if (name == "n") {
            newAccounts[index][name] = Number(value)
        }
        else {
            newAccounts[index][name] = value;
        }

        if (name == "n") {
            var contrFreq = ""
            switch (Number(value)) {
                case 365:
                    contrFreq = "Daily"
                    break
                case 52:
                    contrFreq = "Weekly"
                    break
                case 26:
                    contrFreq = "Every Other Week"
                    break
                case 24:
                    contrFreq = "Twice per Month"
                    break
                case 12:
                    contrFreq = "Monthly"
                    break
                case 6:
                    contrFreq = "Every 2 Months"
                    break
                case 4:
                    contrFreq = "Every 3 Months (Quarterly)"
                    break
                case 2:
                    contrFreq = "Every 6 Months"
                    break
                case 1:
                    contrFreq = "Yearly"
                    break
            }
            newAccounts[index]["contrFreq"] = contrFreq;
            for (const t of after_years) {
                let roi = 0;
                for (const ac of accounts) {
                    const B = ac["Initial Balance"]
                    n = ac["n"]
                    M = ac["Contribution Amount"]
                    R = 0.05
                    const BeRt = B * Math.exp(R * t);
                    const monthly_growth = M * (Math.exp(R * t) - 1) / (Math.exp(R / n) - 1);
                    roi = BeRt + monthly_growth;
                }
                age_pred.push(roi);
            }
            newAccounts[index]["predictions"] = age_pred
        }

        // try {
        //     fs.writeFileSync("accounts.json", JSON.stringify(newAccounts, null, 2));
        // } catch (err) {
        //     console.error("Failed to write file:", err);
        // }
        // localStorage.setItem("accounts", JSON.stringify(newAccounts));
        // makeImage();

        setAccounts(newAccounts);
    };

    const handleUserInfoInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormInfo({
            ...userFormInfo,
            [name]: value,
        });
    }

    const handleSubmitAccounts = () => {
        setShowState(ShowStates.SUMMARIZE_ACCOUNTS)
        setUserInfo(userFormInfo)
    }

    const handleEdit = () => {
        setShowState(ShowStates.ADD_ACCOUNTS)
    }


    // function generatePlot() {
    //     console.log("generating plot")

    //     const data = JSON.stringify({ age: ageArr, predictions });
    //     fs.writeFileSync("plot_input.json", data);
    // }

    // const makePlotData = () => {
    //     console.log("making image")
    //     // console.log(userInfo.age)
    //     // const [init_age, accounts] = await collectUserInfo();
    //     const after_years = Array.from({ length: 70 - userInfo.age }, (_, i) => i);
    //     const growth_rates = [-0.01, 0.01, 0.03, 0.05, 0.07, 0.09];
    //     const predictions = generatePredictedROI(accounts, after_years, growth_rates);
    //     generatePlot(init_age, predictions, after_years);
    // }

    const handleSeePredictions = () => {
        // setPredictions(accounts)
        setShowState(ShowStates.RESULTS)
    }

    return (
        <>
            <div className="header-div">
                <h1>Your Financial Picture</h1>
            </div>

            {showState == ShowStates.ADD_ACCOUNTS &&
                // TODO add remove account button
                <div className="personal-info">
                    <div className="row g-3">
                        <div className="col-md-8">
                            {/* <label for="inputUsername" className="col-form-label">Name</label> */}
                            <input
                                type="text"
                                name="username"
                                placeholder='Name'
                                onChange={(event) => handleUserInfoInputChange(event)}
                                className="form-control"
                                id="inputUsername" />
                        </div>

                        <div className="col-md-4">
                            {/* <label for="inputAge" className="col-form-label">Age</label> */}
                            <input
                                type="number"
                                name="age"
                                placeholder='Age'
                                onChange={(event) => handleUserInfoInputChange(event)}
                                className="form-control"
                                id="inputAge" />
                        </div>
                    </div>
                </div>
            }

            {showState == ShowStates.SUMMARIZE_ACCOUNTS &&
                <h3>Review Your Information</h3>
            }

            {showState == ShowStates.ADD_ACCOUNTS ?
                accounts.map((account, index) => (
                    <div key={index} className="add-account">

                        <hr />

                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label className="col-form-label">Account Name</label>
                            </div>
                            <div className="col-auto">
                                <input
                                    type="text"
                                    name="name"
                                    value={account.name}
                                    placeholder="Account Name"
                                    onChange={(event) => handleInputChange(index, event)}
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="row g-3 align-items-center">
                            <div className="input-group mb-3">
                                <label className="col-form-label">Current Balance</label>
                                <span className="input-group-text">$</span>
                                <input
                                    type="number"
                                    name="initBalance"
                                    placeholder="0"
                                    value={account.initBalance}
                                    onChange={(event) => handleInputChange(index, event)}
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <label className="input-group-text">Contribution Frequency</label>
                            <select
                                className="form-select"
                                name="n"
                                id="inputGroupSelect01"
                                value={String(account.n)}
                                onChange={(event) => handleInputChange(index, event)}
                            >
                                <option value="0">Frequency</option>
                                <option value="365">Daily</option>
                                <option value="52">Weekly</option>
                                <option value="26">Every Other Week</option>
                                <option value="24">Twice per Month</option>
                                <option value="12">Monthly</option>
                                <option value="6">Every 2 Months</option>
                                <option value="4">Every 3 Months (Quarterly)</option>
                                <option value="2">Every 6 Months</option>
                                <option value="1">Once per Year</option>
                            </select>
                        </div>

                        <div className="row g-3 align-items-center">
                            <div className="input-group mb-3">
                                <label className="col-form-label">Contribution Amount</label>
                                <span className="input-group-text">$</span>
                                <input
                                    type="number"
                                    name="contrAmount"
                                    value={account.contrAmount}
                                    placeholder="0"
                                    onChange={(event) => handleInputChange(index, event)}
                                    className="form-control"
                                />
                            </div>
                        </div>

                    </div>

                ))

                :
                showState == ShowStates.SUMMARIZE_ACCOUNTS ?
                    <div>
                        <h4>{userInfo.username}, {userInfo.age}</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Initial Balance</th>
                                    <th>Contribution Frequency</th>
                                    <th>Contribution Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts.map((account, index) => (
                                    <tr key={index}>
                                        <td>{account.name}</td>
                                        <td>${account.initBalance}</td>
                                        <td>{account.contrFreq}</td>
                                        <td>${account.contrAmount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    :
                    <div>
                        <h2>Investment Predictions</h2>
                        <img src={sampleImage} />
                        {/* {accounts.map((account, index) => (
                                    <Plot
                                    data={[
                                        {
                                            x: after_years,
                                            y: account.predictions,
                                            type: 'scatter',
                                            mode: 'lines+markers',
                                            marker: { color: 'green' },
                                        },
                                    ]}
                                    layout={{ title: 'Retirement Savings Over Time' }}
                                />
                                ))} */}
                        
                    </div>

            }



            {showState == ShowStates.ADD_ACCOUNTS &&
                <div>
                    <button className="btn btn-primary" onClick={handleAddAccount}>Add Account</button>
                    <button className="btn btn-primary" onClick={handleSubmitAccounts}>Submit Accounts</button>
                </div>
            }

            {showState == ShowStates.SUMMARIZE_ACCOUNTS &&
                <div>
                    <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
                    <button className="btn btn-primary" onClick={handleSeePredictions}>See Predictions</button>
                </div>
            }

            {showState == ShowStates.RESULTS &&
                <div>
                    <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
                </div>
            }
        </>
    )
}

export default InputComponent