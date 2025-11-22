import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users, Car } from 'lucide-react';

function LandingHero() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [bookingType, setBookingType] = useState<'carpool' | 'private'>('carpool');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [seats, setSeats] = useState('1');

  const handleFindTrip = useCallback(() => {
    // Navigate to search results page with query params
    const params = new URLSearchParams({
      type: bookingType,
      from,
      to,
      date,
      seats,
    });
    navigate(`/search?${params.toString()}`);
  }, [navigate, bookingType, from, to, date, seats]);

  return (
    <section
      className={cn(
        "relative min-h-[calc(100vh-4rem)] flex items-center",
        "bg-gradient-to-r from-[var(--color-light-blue)] to-[var(--color-dark-blue)]",
        "py-12 md:py-24"
      )}
      aria-label="Hero section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Headline */}
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Right: Booking Widget */}
          <div className="w-full">
            <Card className="bg-white shadow-2xl p-6 md:p-8">
              {/* Tabs */}
              <Tabs value={bookingType} onValueChange={(value) => setBookingType(value as 'carpool' | 'private')}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger 
                    value="carpool" 
                    className={cn(
                      "flex items-center gap-2",
                      bookingType === 'carpool' && "bg-green-100 text-green-700"
                    )}
                  >
                    <Users className="h-4 w-4" />
                    <span className="font-semibold">{t('hero.bookingWidget.carpoolTab')}</span>
                    <span className="text-xs">({t('hero.bookingWidget.carpoolTabDesc')})</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="private"
                    className={cn(
                      "flex items-center gap-2",
                      bookingType === 'private' && "bg-blue-100 text-blue-700"
                    )}
                  >
                    <Car className="h-4 w-4" />
                    <span className="font-semibold">{t('hero.bookingWidget.privateTab')}</span>
                    <span className="text-xs">({t('hero.bookingWidget.privateTabDesc')})</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="carpool" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="from-carpool">
                        {t('hero.bookingWidget.from')}
                      </Label>
                      <Input
                        id="from-carpool"
                        type="text"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        placeholder={t('hero.bookingWidget.from')}
                        className="focus-visible:ring-[var(--color-dark-blue)]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="to-carpool">
                        {t('hero.bookingWidget.to')}
                      </Label>
                      <Input
                        id="to-carpool"
                        type="text"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder={t('hero.bookingWidget.to')}
                        className="focus-visible:ring-[var(--color-dark-blue)]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-carpool">
                        {t('hero.bookingWidget.date')}
                      </Label>
                      <Input
                        id="date-carpool"
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="focus-visible:ring-[var(--color-dark-blue)]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="seats-carpool">
                        {t('hero.bookingWidget.seats')}
                      </Label>
                      <Input
                        id="seats-carpool"
                        type="number"
                        min="1"
                        value={seats}
                        onChange={(e) => setSeats(e.target.value)}
                        className="focus-visible:ring-[var(--color-dark-blue)]"
                      />
                    </div>
                    <Button
                      onClick={handleFindTrip}
                      size="lg"
                      className={cn(
                        "w-full text-lg py-6",
                        "bg-green-600 hover:bg-green-700 text-white"
                      )}
                    >
                      {t('hero.bookingWidget.findTrip')}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="private" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="from-private">
                        {t('hero.bookingWidget.from')}
                      </Label>
                      <Input
                        id="from-private"
                        type="text"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        placeholder={t('hero.bookingWidget.from')}
                        className="focus-visible:ring-[var(--color-dark-blue)]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="to-private">
                        {t('hero.bookingWidget.to')}
                      </Label>
                      <Input
                        id="to-private"
                        type="text"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder={t('hero.bookingWidget.to')}
                        className="focus-visible:ring-[var(--color-dark-blue)]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-private">
                        {t('hero.bookingWidget.date')}
                      </Label>
                      <Input
                        id="date-private"
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="focus-visible:ring-[var(--color-dark-blue)]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="seats-private">
                        {t('hero.bookingWidget.seats')}
                      </Label>
                      <Input
                        id="seats-private"
                        type="number"
                        min="1"
                        value={seats}
                        onChange={(e) => setSeats(e.target.value)}
                        className="focus-visible:ring-[var(--color-dark-blue)]"
                      />
                    </div>
                    <Button
                      onClick={handleFindTrip}
                      size="lg"
                      className={cn(
                        "w-full text-lg py-6",
                        "bg-blue-600 hover:bg-blue-700 text-white"
                      )}
                    >
                      {t('hero.bookingWidget.findTrip')}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingHero;
