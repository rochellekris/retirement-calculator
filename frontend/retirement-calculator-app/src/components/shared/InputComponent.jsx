// import React from "react"
import React, { useState } from 'react'
import sampleImage from "../../assets/images/SampleGraph.png"
import '../../App.css'


function InputComponent() {
    const sampleAccounts =
        [
            // {
            //     name: 'account 1',
            //     initBalance: 100,
            //     contrFreq: "Weekly",
            //     n: 52,
            //     contrAmount: 50
            // },
            // {
            //     name: 'account 2',
            //     initBalance: 300,
            //     contrFreq: "Monthly",
            //     n: 12,
            //     contrAmount: 60
            // }
        ]
    const ShowStates = {
        ADD_ACCOUNTS: 'addAccounts',
        SUMMARIZE_ACCOUNTS: 'summarizeAccounts',
        RESULTS: 'showResult',
    };

    const [showState, setShowState] = useState(ShowStates.ADD_ACCOUNTS);

    const [userFormInfo, setUserFormInfo] = useState({ username: '', age: '' });
    const [userInfo, setUserInfo] = useState(null);

    const [accounts, setAccounts] = useState(sampleAccounts);





    const handleAddAccount = () => {
        setShowState(ShowStates.ADD_ACCOUNTS)
        setAccounts([...accounts, {
            name: '',
            initBalance: null,
            contrFreq: "",
            n: null,
            contrAmount: null
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
        }

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

    const handleSeePredictions = () => {
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
                    // make api call 
                    <div>
                        <h2>Investment Predictions</h2>
                        <img src={sampleImage} />
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