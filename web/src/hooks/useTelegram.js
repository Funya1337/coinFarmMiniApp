const tg = window.Telegram.WebApp;

export function useTelegram() {
    const onClose = () => {
        tg.close();
    }

    const onToggle = () => {
        // if (tg.MainButton.isVisible()) {
        //     tg.MainButton.hide();
        // } else {
        //     tg.MainButton.show();
        // }
    }

    return {
        onClose,
        onToggle,
        tg
    }
}