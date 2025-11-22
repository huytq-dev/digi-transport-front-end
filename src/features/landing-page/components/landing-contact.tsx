import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

function LandingContact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSelectChange = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      setIsSubmitting(false);
      alert(t('contact.form.successMessage'));
    },
    [t]
  );

  const contactInfo = [
    {
      icon: Phone,
      title: t('contact.info.phone.title'),
      content: t('contact.info.phone.content'),
      href: 'tel:19001234',
    },
    {
      icon: Mail,
      title: t('contact.info.email.title'),
      content: t('contact.info.email.content'),
      href: 'mailto:support@digitransport.com',
    },
    {
      icon: MapPin,
      title: t('contact.info.address.title'),
      content: t('contact.info.address.content'),
    },
    {
      icon: Clock,
      title: t('contact.info.hours.title'),
      content: t('contact.info.hours.content'),
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-white" aria-label="Contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-dark-blue)]">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--color-dark-blue)]">
                {t('contact.info.title')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('contact.info.description')}
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card
                    key={index}
                    className={cn(
                      'bg-[var(--color-cream)] border-2 border-gray-100',
                      'transition-all duration-300 hover:shadow-lg hover:-translate-y-1'
                    )}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-dark-blue)] flex items-center justify-center">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[var(--color-dark-blue)] mb-1">
                            {info.title}
                          </h4>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-gray-600 hover:text-[var(--color-dark-blue)] transition-colors"
                            >
                              {info.content}
                            </a>
                          ) : (
                            <p className="text-gray-600">{info.content}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="bg-white border-2 border-gray-100 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-6 text-[var(--color-dark-blue)]">
                  {t('contact.form.title')}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {t('contact.form.name')}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="focus-visible:ring-[var(--color-dark-blue)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {t('contact.form.email')}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="focus-visible:ring-[var(--color-dark-blue)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {t('contact.form.phone')}
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="focus-visible:ring-[var(--color-dark-blue)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      {t('contact.form.subject')}
                    </Label>
                    <Select value={formData.subject} onValueChange={handleSelectChange} required>
                      <SelectTrigger id="subject" className="focus:ring-[var(--color-dark-blue)]">
                        <SelectValue placeholder={t('contact.form.selectSubject')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="booking">{t('contact.form.options.booking')}</SelectItem>
                        <SelectItem value="partnership">{t('contact.form.options.partnership')}</SelectItem>
                        <SelectItem value="support">{t('contact.form.options.support')}</SelectItem>
                        <SelectItem value="other">{t('contact.form.options.other')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      {t('contact.form.message')}
                    </Label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className={cn(
                        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                        "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dark-blue)] focus-visible:ring-offset-2",
                        "disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className={cn(
                      "w-full",
                      "bg-[var(--color-dark-blue)] text-white hover:bg-[rgba(74,112,169,0.9)]",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin">⏳</span>
                        {t('contact.form.sending')}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-5 w-5" />
                        {t('contact.form.submit')}
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingContact;
