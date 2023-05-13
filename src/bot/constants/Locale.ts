import M from "minimatch";

export interface Locale {
    [key: string]: {
        [key: string]: any
    }
};

export function FormatString(str: string, ...val: any[]) {
    for (let index = 0; index < val.length; index++) {
        str = str.replace(`{${index}}`, `${val[index]}`);
    }
    return str;
}

export default {
    
    "verify_success": {
        en: "**You have been successfully verified in Wind Developments, welcome to the discord server!**\nHead to the `channels` channel to find information about the server channels.\n**Open a ticket to contact the team, we are happy to help!**",
        he: "**קיבלת את רול הmembers בWind Developments, ברוכים הבאים לשרת הדיסקורד!**\nהכנס לחדר `channels` .כדי למצוא מידע על החדרים בשרת\n**פתח טיקט כדי לדבר עם הצוות, אנחנו נשמח לעזור עם מה שנוכל!**"
    },

    "announcement": {
        "en": "You have toggled the announcement role successfully.",
        "he": "עדכנת את רול ההכרזה בהצלחה."
    },
    
    "ticket_embed": {
        en: {
            description: `**{0}**, Your ticket has been created.\nThe staff will provide you support as soon as possible.`,
            category: "Category",
            created: "Your ticket has been created!"
        },
        he: {
            description: `**{0}**, הטיקט שלך נפתח בהצלחה.\nצוות התמיכה יספקו לך תמיכה בהקדם האפשרי.`,
            category: "קטגוריה",
            created: "הטיקט שלך נפתח!"
        }
    },
    "suggestion": {
        en: {
            sent: "Your suggestion has been recorded. Thank you!",
            failed: "The suggestion channel does not exist, contact the owner!",
            already_upvoted: "You have upvoted this suggestion already!",
            already_downvoted: "You have downvoted this suggestion already!",
            upvote_cant_downvote: "You cannot downvote a suggestion you have already upvoted!",
            downvote_cant_upvote: "You cannot upvote a suggestion you have already downvoted!",
            upvoted: "You have upvoted this suggestion!",
            downvoted: "You have downvoted this suggestion!",
            deleted: "The suggestion has been deleted successfully!",
            delete_failed: "You cannot delete suggestions!"
        },
        he: {
            sent: "ההמלצה שלך נשמרה. תודה לך!",
            failed: "חדר ההמלצות לא קיים, צרו קשר עם בעל השרת!",
            already_upvoted: "אתה כבר הצבעת על ההמלצה הזאת!",
            already_downvoted: "אתה כבר הצבעת נגד ההמלצה הזאת!",
            downvote_cant_upvote: "אתה לא יכול להצביע נגד המלצה שכבר הצבעת בעדה!",
            upvote_cant_downvote: "אתה לא יכול להצביע בעד המלצה שכבר הצבעת נגדה!",
            upvoted: "הצבעת על ההמלצה בהצלחה!",
            downvoted: "הצבעת נגד ההמלצה בהצלחה!",
            deleted: "ההמלצה נמחקה בהצלחה!",
            delete_failed: "אתה לא יכול למחוק המלצות!"
        }
    },
    "language": {
        en: "Your preffered language has been set!",
        he: "השפה המועדפת עליך הוגדרה!"
    },
    "ticket_categories": {
        "support": {
            "en": "Support",
            "he": "תמיכה"
        },
        "bug": {
            "en": "Bug",
            "he": "דיווח על באג"
        },
        "question": {
            "he": "שאלה"
        },
        "staff_app": {
            "he": "פניה לקבלה לצוות"
        },
        "complaint": {
            "he": "תלונה"
        }
        
    }
} as Locale;
