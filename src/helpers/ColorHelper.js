class ColorHelper
{
    static GetColorForAnswer(answer) {
        answer = Math.round(answer);

        switch (answer) {
            case 0:
                return 'bg-red-600';
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

    static GetTextColorForAnswer(answer) {
        answer = Math.round(answer);

        switch (answer) {
            case 0:
                return 'text-red-600';
            case 1:
                return 'text-red-500';
            case 2:
                return 'text-red-400';
            case 3:
                return 'text-yellow-500';
            case 4:
                return 'text-green-300';
            case 5:
                return 'text-green-500';
            default:
                return 'text-gray-500';
        }
    }

    static GetRGBColorForAnswer(answer) {
        answer = Math.round(answer);

        switch (answer) {
            case 0:
                return [185, 28, 28]; // red-600
            case 1:
                return [220, 38, 38]; // red-500
            case 2:
                return [248, 113, 113]; // red-400
            case 3:
                return [245, 158, 11]; // yellow-500
            case 4:
                return [110, 231, 183]; // green-300
            case 5:
                return [16, 185, 129]; // green-500
            default:
                return [107, 114, 128]; // gray-500
        }
    }
}

export default ColorHelper;
