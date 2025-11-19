import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, MessageCircle, Mail } from "lucide-react";

const Help = () => {
  const navigate = useNavigate();

  const faqItems = [
    {
      question: "Как добавить лекарство?",
      answer: "Нажмите кнопку '+' на главном экране или в разделе 'Напоминания'. Вы можете ввести данные вручную или отсканировать упаковку лекарства."
    },
    {
      question: "Как настроить напоминания?",
      answer: "При создании или редактировании лекарства выберите расписание приема. Вы можете настроить время, частоту и продолжительность курса."
    },
    {
      question: "Что делать, если пропустил прием?",
      answer: "Приложение автоматически отметит пропущенные приемы. Вы можете отметить прием позже или пропустить его в истории."
    },
    {
      question: "Как отсканировать упаковку лекарства?",
      answer: "При создании лекарства нажмите на иконку камеры. Приложение распознает название и дозировку автоматически."
    },
    {
      question: "Как отследить остаток лекарств?",
      answer: "Укажите количество таблеток в упаковке при создании. Приложение будет автоматически отслеживать остаток и напомнит о необходимости покупки."
    },
    {
      question: "Можно ли добавить несколько курсов лечения?",
      answer: "Да, вы можете добавить неограниченное количество лекарств и курсов лечения. Все они будут отображаться в едином календаре."
    },
    {
      question: "Как экспортировать данные для врача?",
      answer: "В разделе 'Статистика' нажмите кнопку 'Экспорт'. Вы можете отправить PDF с историей приема врачу."
    },
    {
      question: "Как изменить часовой пояс?",
      answer: "Перейдите в Настройки → Часовой пояс. Выберите ваш часовой пояс из списка."
    },
  ];

  return (
    <MainLayout showBottomNav={false}>
      <div className="fixed top-0 left-0 right-0 z-40 bg-card border-b px-3 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/profile")}
          className="shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground">
          Помощь и FAQ
        </h1>
      </div>

      <div className="pt-14 pb-6 space-y-3">
        <Card className="p-4">
          <h2 className="font-semibold text-foreground mb-3">Часто задаваемые вопросы</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-sm">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        <Card className="p-4 space-y-3">
          <h2 className="font-semibold text-foreground">Нужна помощь?</h2>
          <p className="text-sm text-muted-foreground">
            Не нашли ответ на свой вопрос? Свяжитесь с нами:
          </p>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href="https://t.me/support" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" />
                Написать в Telegram
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href="mailto:support@example.com">
                <Mail className="h-4 w-4 mr-2" />
                Написать на email
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Help;
