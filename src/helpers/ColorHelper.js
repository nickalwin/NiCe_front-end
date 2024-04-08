class ColorHelper
{
    static GetColorForAnswer(answer) {
        switch (answer) {
            case 0:
                return 'bg-blue-500';
            case 1:
                return 'bg-red-500';
            case 2:
                return 'bg-red-400';
            case 3:
                return 'bg-yellow-500';
            case 4:
                return 'bg-green-300';
            case 5:
                return 'bg-green-500';
            default:
                return 'bg-gray-500';
        }
    }
}

export default ColorHelper;
