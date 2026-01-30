import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const DashboardPage = async () => {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-sans font-bold tracking-tighter text-primary uppercase">
                    System Overview
                </h1>
                <p className="text-muted-foreground font-sans mt-2">Welcome to the ApeX Command Center.</p>
            </header>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-primary/5 border-primary/20 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-sm font-sans text-primary/70 uppercase tracking-wider">
                            Active Inquiries
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-sans font-bold text-primary">0</div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-sm font-sans text-primary/70 uppercase tracking-wider">
                            System Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-sans font-bold text-emerald-500 uppercase">Nominal</div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-sm font-sans text-primary/70 uppercase tracking-wider">
                            Network Load
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-sans font-bold text-primary">12%</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
