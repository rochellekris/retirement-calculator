import inflect
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
from matplotlib.ticker import MultipleLocator

p = inflect.engine()


def generate_plot(initial_age, predictions, after_years):
    age = [x + initial_age for x in after_years]

    sns.set_theme()

    fig, ax = plt.subplots(figsize=(10, 6))

    for rate in predictions:
        y = np.array(predictions[rate]) / 1000
        if rate == 0.05:
            linestyle = None
        else:
            linestyle = "--"
        plt.plot(age, y, linestyle=linestyle, label=rate)

    plt.title("Predicted Retirement Savings")

    plt.xlabel("Age")
    ax.xaxis.set_major_locator(MultipleLocator(5))
    ax.xaxis.set_minor_locator(MultipleLocator(1))

    plt.ylabel("Estimated Savings (Thousands of $)")
    ax.yaxis.set_major_locator(MultipleLocator(2000))
    ax.yaxis.set_minor_locator(MultipleLocator(500))
    ax.set_ylim(bottom=0)

    plt.grid(True)

    plt.legend(title="Growth Rate", bbox_to_anchor=(1, 0.5))

    plt.tight_layout(rect=[0, 0, 0.85, 1])

    # plt.show()
    
    plt.savefig("SampleGraph.png")
    
if __name__ == "__main__":
    pass