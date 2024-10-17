from simple_term_menu import TerminalMenu
import math
import matplotlib.pyplot as plt 
from matplotlib.ticker import MultipleLocator
import numpy as np
import seaborn as sns
import inflect
p = inflect.engine()


def retirement_predictor_main():
    init_age, accounts = collect_user_info()

    after_years = [y for y in range(0, 70-init_age)]
    growth_rates = [-0.01, 0.01, 0.03, 0.05, 0.07, 0.09]

    predictions = generate_predicted_roi(init_age, accounts, after_years, growth_rates)

    generate_plot(predictions, after_years)

def collect_user_info():
    print("\n\nWelcome!")
    print("\nI need to gather some information about your current situation. Please answer the following questions and hit enter to submit your answers.")
    try:
        init_age = int(input("\nPlease enter your current age: "))
        num_accounts = int(input("\nPlease enter the number of retirement accounts you have: "))
        accounts = []
        if num_accounts < 0:
            print("You cannot have a negative number of accounts.")
            return
        elif num_accounts == 0:
            print("Sorry! You need to have an account to use this program!")
        else:
            for i in range(num_accounts):
                acc_dict = {}
                acc_dict["Name"] = input(f"\n\nWhat is the name of your {p.ordinal(i+1)} account? ")
                acc_dict["Initial Balance"] = float(input(f"What is the current balance of {acc_dict['Name']}? $"))

                contr_options = {"Daily":365, "Weekly":52, "Every Other Week":26, "Twice a Month":24, "Monthly":12, "Every 2 Months":6, "Every 3 Months":4, "Semi-Yearly":2, "Yearly":1}
                terminal_menu = TerminalMenu(contr_options.keys())
                acc_dict["Contribution Frequency"] = list(contr_options.keys())[terminal_menu.show()]
                acc_dict["n"] = contr_options[acc_dict["Contribution Frequency"]]


                acc_dict["Contribution Amount"] = float(input(f"\nHow much do you contribute {acc_dict['Contribution Frequency'].lower()} to {acc_dict['Name']}? $"))

                accounts += [acc_dict]
        return init_age, accounts
    except ValueError:
        print("Invalid value entered.")    


def generate_predicted_roi(init_age, accounts, after_years, growth_rates):
    predictions = {}

    for r in growth_rates:
        age_pred = [] 
        for y in after_years:
            roi = 0
            for ac in accounts:
                roi += return_on_investment(ac["Initial Balance"], ac["n"], ac["Contribution Amount"], r, y)

            age_pred += [roi]
            
        predictions[r] = age_pred
    
    return predictions


def return_on_investment(B, n, M, R, t):
    BeRt = B * math.exp(R * t)

    monthly_growth = M * (math.exp(R * t) - 1) / (math.exp(R / n) - 1)

    return BeRt + monthly_growth


def generate_plot(predictions, after_years):
    age = [x + 23 for x in after_years]

    sns.set_theme()

    fig, ax = plt.subplots(figsize=(10, 6))


    for rate in predictions:
        y = np.array(predictions[rate])/1000
        if rate == 0.05:
            linestyle = None
        else:
            linestyle = "--"
        plt.plot(age, y, linestyle=linestyle, label=rate)


    plt.title('Predicted Retirement Savings')

    plt.xlabel('Age')
    ax.xaxis.set_major_locator(MultipleLocator(5))
    ax.xaxis.set_minor_locator(MultipleLocator(1))

    plt.ylabel('Estimated Savings (Thousands of $)')
    ax.yaxis.set_major_locator(MultipleLocator(2000))
    ax.yaxis.set_minor_locator(MultipleLocator(500))
    ax.set_ylim(bottom=0)


    plt.grid(True)

    plt.legend(title="Growth Rate", bbox_to_anchor=(1, 0.5))

    # Adjust layout to make room for the legend
    plt.tight_layout(rect=[0, 0, 0.85, 1])


    plt.show()



if __name__ == "__main__":
    retirement_predictor_main()