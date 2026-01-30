import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const CompetitionPage = async () => {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-sans font-bold tracking-tighter text-primary uppercase">
            Competitions
          </h1>
          <p className="text-muted-foreground font-sans mt-2">
            Manage and participate in coding competitions.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard">
            <Button variant="outline">
              Back to Dashboard
            </Button>
          </Link>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Create Competition
          </Button>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder for competition cards */}
        <Card className="bg-primary/5 border-primary/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-sans text-primary">
              Sample Competition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              A sample competition description. This will be replaced with real
              data.
            </p>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              <Button variant="outline" size="sm">
                Join
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center py-8">
        <p className="text-muted-foreground">
          No competitions available yet. Create your first competition to get
          started!
        </p>
      </div>
    </div>
  );
};

export default CompetitionPage;