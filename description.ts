export const description =
	"most challenges, the goal is not only to write a program that produces a certain output for a given input, but also to make this program as efficient as possible. Only a limited time is available for the execution of the program (see below). If the program is not finished after this time limit (in this introduction challenge one second), the corresponding test case and thus the subtask is considered as failed. In this challenge, the task is to calculate the sum of the first ***n*** natural numbers for a given natural number ***n***. \n\n<br/>\n\nA possible solution for this is to iterate over the first ***n*** natural numbers, adding them together. However, the execution time of this solution is proportional to ***n***, which becomes problematic in the second sub-task, since up to two billion numbers would have to be added, which would take an extremely long time. A better solution here would be, for example, the Gaussian summation formula:\n\n<br/>\n\n$$sum_{k=1}^{n}k=\\frac{n(n+1)}{2}$$\n\n<br/>\n\nwhich can be used to calculate the sum of the first ***n*** natural numbers in constant time. \n\n**Note**: When implementing the Gaussian summation formula, it is essential to make sure that you exclusively use integers and not floats in your calculations, since the latter are too imprecise for the numbers relevant in Task 2. A frequently occurring problem, especially in Python, is that dividing by 2 results in a float at the end, which is unfortunately too inaccurate. Instead of dividing by 2 using the `/` operator (float division) and then converting the float into an integer, the `//` operator (integer division) can be used, which directly returns an integer when dividing, whereby no precision should be lost.\n\n<br/>\n\n### Input:\n- Line 1: The number ***n*** \n\n### Output:\n- Line 1: The sum of the first ***n*** natural numbers $$sum_{k=1}^{n}k$$\n\n```JAVASCRIPT\nlet a = 'hello world'\nconsole.log(a)\n```";
